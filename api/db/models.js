const mongoose = require('mongoose');

const { customerSchema, itemSchema, dbStatusSchema } = require('./schemas');

const Customer = mongoose.model('Customer', customerSchema);
const Item = mongoose.model('Item', itemSchema);
const DBStatus = mongoose.model('DBStatus', dbStatusSchema);

module.exports = {
    Customer: Customer,
    Item: Item,
    DBStatus: DBStatus
}

