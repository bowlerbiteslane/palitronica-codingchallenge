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
  let customer;
  try{
    customer = await Customer.findOne({id: custId});
  } catch (error){
    console.log(error);
    res.status(500).send(`Could not find customer with ID: ${custId}`);
    return;
  }
  if(!customer){
    res.status(500).send({message: `Could not find customer with ID: ${custId}`});
    return;
  }
  console.log("Customer:", customer);

  // Get Item information from DB
  const validItems = items.filter(item => item.quantity > 0);

  const dbItems = await Item.find()
      .where('id')
      .in(validItems.map(item => item.id));

  //console.log("DB Items", dbItems);

  // Determine Item Totals
  const itemTotals = validItems.map(item => {
    const dbItem = dbItems.find(dbItem => dbItem.id === item.id);
    const itemTotal = Math.round((dbItem.price * item.quantity) * 100) / 100; // round to nearest penny
    console.log(itemTotal)
    return {
        id: item.id, 
        name: dbItem.name, 
        price: dbItem.price,
        quantity: item.quantity, 
        total: itemTotal
      }
  });
  //console.log("Item Totals: ", itemTotals);
  
  const itemTotalValue = itemTotals.length > 0 ? itemTotals.map(item => item.total).reduce((prev, current) => prev + current) : 0;

  //calculate tax 
  let taxRate = 0.0;
  try {
    taxRate = await taxJarClient.ratesForLocation(customer.postal_code, {
      city: customer.city, 
      state: customer.state,
      country: customer.country
    });
  } catch(error) {
    console.log(error);
    res.status(500).send("Failed to calculate rates.");
    return;
  }

  //console.log(taxRate);
  const totalTax = Math.round((itemTotalValue * taxRate.rate.combined_rate) * 100) / 100; // round to nearest penny
  
  // calculate overall total
  const total = itemTotalValue + totalTax;
  
  const calculateRes = {
    success: true,
    customer: {
      id: customer.id,
      name: customer.name,
      postal_code: customer.postal_code,
      city: customer.city,
      state: customer.state,
      country: customer.country
    },
    itemTotals: itemTotals,
    subTotal: itemTotalValue,
    totalTax: totalTax,
    total: total
  }
  console.log("calculateRes", calculateRes);
  res.send(calculateRes);
});

module.exports = router;
