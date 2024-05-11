const mongoose = require('mongoose');

const createModel = (collectionName) => {
    let Transactions;
    try {
        Transactions = mongoose.model(collectionName);
    } catch (error) {
        if (error.name === 'MissingSchemaError') {
            // Collection doesn't exist, create a new model
            const MainSchema = new mongoose.Schema({
                blockNumber: String,
                timeStamp: String,
                hash: String,
                nonce: String,
                blockHash: String,
                transactionIndex: String,
                from: String,
                to: String,
                value: String,
                gas: String,
                gasPrice: String,
                isError: String,
                txreceipt_status: String,
                input: String,
                contractAddress: String,
                cumulativeGasUsed: String,
                gasUsed: String,
                confirmations: String,
                methodId: String,
                functionName: String,
            });
            Transactions = mongoose.model(collectionName, MainSchema);
        } else {
            throw error;
        }
    }
    return Transactions;
};

module.exports = createModel;
