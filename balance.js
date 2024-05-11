const express = require('express');
const router = express.Router()
const createModel = require('./model.js');
const axios = require('axios');

router.get('/:address', async (req, res) => {
    try {
        // Fetch transactions from Etherscan API
        const address = req.params.address;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=3IMNCIYG7XCNEATZGS4888UCYD4EINAGXJ`;

        // Fetch transactions from Etherscan API
        const response = await axios.get(url);
        const transactions = response.data.result;
        // Send transactions as response
        //   const receivedData = res.json(response.data.result);
        let balance = 0;
        transactions.forEach(async (transactionData) => {
            try {
                const userAddress = address;
                console.log(userAddress);
                const Model = createModel(userAddress);
                const transaction = new Model(transactionData);
                await transaction.save();
                if(transaction.from===address) balance -= parseInt(transaction.value);
                if(transaction.to===address) balance += parseInt(transaction.value);
                console.log('Transaction saved successfully:', transaction);
                // console.log("total balance:", balance);
                console.log("total balance:", balance);
            } catch (error) {
                console.error('Error saving transaction:', error);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

)

module.exports = router;