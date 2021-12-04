const mongoose = require('mongoose');
const { Customer, Item } = require('./models');

// Connecting to MongoDB
const connection = mongoose.connect('mongodb://mongodb:27017/palitronica');
// If there is a connection error send an error message
mongoose.connection.on('error', error => {
    console.log('Database connection error:', error);
});

// If connected to MongoDB send a success message
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from Database!');
});

// If connected to MongoDB send a success message
mongoose.connection.once('open', () => {
    console.log('Connected to Database!');
});

const initialize = () => {
    Customer.insertMany([
        {id: '1', name: 'Bob Benny'},
        {id: '2', name: 'Jane Jowan'},
        {id: '3', name: 'Terry Wilson'}
    ]);

    Item.insertMany([
        {id: '1', price: 5.99},
        {id: '2', price: 8.99},
        {id: '3', price: 7.00}
    ])


    // Customer.createCollection()
    //     .then(() => {
    //         console.log('Customer collection created.');
    //         Customer.insertMany()
    //     });
    // Item.createCollection()
    //     .then(() => console.log('Item collection created'));
}


module.exports = {
    initialize: initialize,
}