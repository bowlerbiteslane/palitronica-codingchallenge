const mongoose = require('mongoose');
const { Schema } = mongoose;

const dbStatusSchema = new Schema({
    initialized: Boolean
})

const customerSchema = new Schema({
    id:  String, // String is shorthand for {type: String}
    name: String,
    postal_code: String,
    city: String,
    state: String,
    country: String
});

const itemSchema = new Schema({
    id: String,
    name: String,
    price: Number
});

module.exports = {
    customerSchema: customerSchema,
    itemSchema: itemSchema,
    dbStatusSchema: dbStatusSchema
}
