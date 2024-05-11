require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const route = require('./route.js');
const balance = require('./balance.js');
const port = 3000;
const axios = require('axios');


// API route to fetch transactions for a given address
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use('/transactions', route);
app.use('/balance', balance);

async function fetchEthereumPrice() {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
      const ethereumPrice = response.data.ethereum.inr;
      console.log('Ethereum price:', ethereumPrice);
  } catch (error) {
      console.error('Error fetching Ethereum price:', error);
  }
}

database.on('error', (error) => {
    console.log(error)
})
  
database.once('connected', () => {
    console.log('Database Connected');
})
fetchEthereumPrice();
setInterval(fetchEthereumPrice, 1000 * 60 *10 );