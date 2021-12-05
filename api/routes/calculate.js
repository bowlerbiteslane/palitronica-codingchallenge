var express = require('express');
const mongoose = require('mongoose');
const { Customer, Item } = require('../db/models');
var router = express.Router();
const TaxJar = require('taxjar');

const taxJarClient = new TaxJar({
  apiKey: process.env.TAXJAR_API_KEY
})

/* POST calculation. */
router.post('/', async (req, res) => {
  console.log("Request Body: ", req.body);

  const {
    custId,
    items
  } = req.body;

  // Get Customer information from DB
  const customer = await Customer.findOne({id: custId});
  console.log("Customer:", customer);

  // Get Item information from DB
  const validItems = items.filter(item => item.quantity > 0);

  const dbItems = await Item.find()
      .where('id')
      .in(validItems.map(item => item.id));

  console.log("DB Items", dbItems);

  // Determine Item Totals
  const itemTotals = validItems.map(item => {
    const itemPrice = dbItems.find(dbItem => dbItem.id === item.id).price;
    const itemTotal = itemPrice * item.quantity;
    return {
        id: item.id, 
        name: item.name, 
        quantity: item.quantity, 
        total: parseInt(itemTotal.toFixed(2))
      }
  });
  console.log("Item Totals: ", itemTotals);
  
  const itemTotalValue = itemTotals.length > 0 ? itemTotals.map(item => item.total).reduce((prev, current) => prev + current) : 0;

  //calculate tax 
  let taxRate = 0.0;
  try {
    taxRate = await taxJarClient.ratesForLocation(customer.postal_code, {
      city: customer.city, 
      state: customer.state,
      country: customer.country
    });
  } catch(error){
    console.log(error);
  }

  console.log(taxRate);
  const totalTax = itemTotalValue * taxRate.rate.combined_rate;
  
  // calculate overall total
  const total = itemTotalValue + totalTax;
  
  const calculateRes = {
    success: true,
    custName: customer.name,
    itemTotals: itemTotals,
    subTotal: itemTotalValue.toFixed(2),
    totalTax: totalTax.toFixed(2),
    total: total.toFixed(2)
  }
  console.log("calculateRes", calculateRes);
  res.send(calculateRes);
});

module.exports = router;
