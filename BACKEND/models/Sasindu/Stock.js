const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    productCode: {
        type: String,
        required: true,
        trim: true
    },
    productCategory: {
        type: String,
        required: true,
        trim: true
    },
    product: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    supplyCompany: {
        type: String,
        trim: true
    },
    dateReceived: {
        type: Date,   // FIX: enforce Date type instead of String
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0        // FIX: ensure no negative quantity
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0        // FIX: prevent negative prices
    }
});

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
