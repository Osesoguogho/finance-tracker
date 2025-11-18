const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true, unique: true},
    password: {type: String, reuired: true},
    createdAt: {type: Date, default: new Date()}
},
{timestamps : true}
);

const users = mongoose.model("users", userSchema);

const expenseSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    name: {type: String, require: true},
    description: {type: String, require: true},
    category:{type: String, required: true},
    payment_method: {type: String, require: true},
    amount: {type: Number, required: true, default: 0},
    // purseBalance: {type: mongoose.SchemaTypes.ObjectId, ref: "purseMoney"},
    // createdAt: {type: Date, default: new Date().toLocaleString()}
},
{timestamps : true});

const expenses = mongoose.model("expenses", expenseSchema);

const purse = new mongoose.Schema({
    email: {type: String, require: true},
    purse_balance: {type: Number, require: true}
},
{timestamps : true});

const purseMoney = mongoose.model("purseMoney", purse);

module.exports = {users, expenses, purseMoney};

