const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//midle wares
app.use(cors());
app.use(express.json());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {

    const nameUrl="https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=e48318e4bdba48cd8efd5989e1301ce2";
try {
    const nameResponse = await axios.get(nameUrl);
    const  nameData = nameResponse.data;

return res.json(nameData);

    }catch(error){
        console.log(error);
    }
});


app.get("/convertCurrency", async (req, res) => {
    const { date, sourceCurrency, TargetCurrency, Amountinsourcecurrency } = req.query;
  
    try {
      const dataurl = `https://openexchangerates.org/api/historical/${date}.json?app_id=e48318e4bdba48cd8efd5989e1301ce2`;
  
      const dataResponse = await axios.get(dataurl);
      const rates = dataResponse.data.rates;
  
      if (!rates[sourceCurrency] || !rates[TargetCurrency]) {
        return res.status(400).json({ error: "Invalid currency codes" });
      }
  
      const sourceRate = rates[sourceCurrency];
      const targetRate = rates[TargetCurrency];
  
      const targetAmount = (targetRate / sourceRate) * Amountinsourcecurrency;
      return res.json({ convertedAmount: targetAmount.toFixed(2) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error converting currency" });
    }
  });
  




    //listend to a port
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});