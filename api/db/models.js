const mongoose = require('mongoose');

const { customerSchema, itemSchema } = require('./schemas');

const Customer = mongoose.model('Customer', customerSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
    Customer: Customer,
    Item: Item,
}

