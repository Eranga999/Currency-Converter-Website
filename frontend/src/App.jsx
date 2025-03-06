import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
//state for form
const[date,setDate]=useState(null);
const[sourceCurrency,setSourceCurrency]=useState(""); 
const[TargetCurrency,setTargetCurrency]=useState("");
const[Amountinsourcecurrency,setAmmountinsourcecurrency]=useState(0);
const[ammountintargetcurrency,setAmmountintargetcurrency]=useState(0);
const[CurrencyName,setCurrencyName]=useState([]);
const[loarding,setloarding] = useState(true);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get("http://localhost:5000/convertCurrency", {
      params: {
        date,
        sourceCurrency,
        TargetCurrency,
        Amountinsourcecurrency,
      },
    });

    // Extract the converted amount correctly
    setAmmountintargetcurrency(response.data.convertedAmount);
    setloarding(false);
  } catch (error) {
    console.log(error);
  }
};




useEffect(() => {
  const getCurrencyName=async()=>{
 try{
      const response =await axios.get(
        "http://localhost:5000/getAllCurrencies"
      );
      setCurrencyName(response.data);
 }catch(error){
   console.log(error);
  }
};
getCurrencyName();
},[]);




  return (
<div>
    <h1 className="lg:mx-32 text-1xl font-bold text-green-500">Ultimate Currency Conversion Tool</h1>
    <p className="lg:mx-32 opacity-40 py-6">Looking for a reliable and easy-to-use currency converter? You've found the right place! [Your Website Name] provides real-time currency exchange rates for over 100+ currencies worldwide. Whether you're planning a trip, making an international purchase, or just curious about exchange rates, our website has got you covered.</p>

<div className='mt-5 flex items-center justify-center flex-col'>
    <section className='w-full lg:w-1/2'>
      <form onSubmit={handleSubmit}>



  <div className="mb-4">
   <label 
    htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Date
    </label>
    <input onChange={(e)=> setDate(e.target.value) }  type="date" id={date}name={date}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
     placeholder="" required />
  </div>
        

  <div className="mb-4">
   <label 
    htmlFor={sourceCurrency}className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Source Currency
    </label>
    <select    onChange={(e) => setSourceCurrency(e.target.value)} className="
    border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name={sourceCurrency} id={sourceCurrency}value={sourceCurrency}>
      <option value="">Select source currency     </option>
      {Object.keys(CurrencyName).map((currency) => (
        <option  className="p-1" key={currency} value={currency}>
          {CurrencyName[currency]}
        </option>
      ))}
    </select>

  </div>

  <div className="mb-4">
   <label 
    htmlFor={TargetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Target Currency
    </label>
    <select   onChange={(e) => setTargetCurrency(e.target.value)} className="
    border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name={TargetCurrency} id={TargetCurrency} value={TargetCurrency}>
      <option value="">Select Target Currency</option>
      {Object.keys(CurrencyName).map((currency) => (
        <option  className="p-1" key={currency} value={currency}>
          {CurrencyName[currency]}
        </option>
         ))}
    </select>
    
  </div>

  <div className="mb-4">
   <label 
    htmlFor={Amountinsourcecurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Amount in source currency
    </label>
    <input onChange={(e) => setAmmountinsourcecurrency(e.target.value)}
 type="number" id={Amountinsourcecurrency} name={Amountinsourcecurrency} 
 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
     placeholder="Amount in source currency" required />
  </div>

  <button  className="bg-green-600 hover:bg-green-700 text-wh font-medium py-2 px-4 rounded-md"
> {""}Get the Target Currency</button>

      </form>
    </section>
</div>
{!loarding ?<section className="lg:mx-60 text-xl  mt-5">
   {Amountinsourcecurrency} {CurrencyName[sourceCurrency]} is equal to {" "} 
   <span className="text-green-500 font-bold"> {""}
   {ammountintargetcurrency} </span> {" "} in {CurrencyName[TargetCurrency]}
</section> : null}



</div>
  )
}

export default App
