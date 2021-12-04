const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    id:  String, // String is shorthand for {type: String}
    name: String,
});

const itemSchema = new Schema({
    id: String,
    price: Number
});

module.exports = {
    customerSchema: customerSchema,
    itemSchema: itemSchema
}
