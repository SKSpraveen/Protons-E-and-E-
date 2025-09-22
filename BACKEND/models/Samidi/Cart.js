const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema =new Schema({
    product:{
        type: String,
        required:true
    },
    orderQuantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },

})
const Cart = mongoose.model("Cart",CartSchema);

module.exports =Cart;