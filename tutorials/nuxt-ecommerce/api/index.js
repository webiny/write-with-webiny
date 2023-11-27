const stripe = require("stripe")(process.env.STRIPE_SK);
const express = require('express');
const app = express();
app.use(express.json());

app.post('/create-product', async (req, res) => {
    let { name } = req.body;
    let product = await stripe.products.create({
        name: name
    });
    return res.json({
        success: true,
        product
    });
});

app.post('/create-price', async (req, res) => {
    let { amount, productId } = req.body;
    console.log("product Id is " + productId);
    let price = await stripe.prices.create({
        unit_amount: amount,
        currency: 'usd',
        product: productId
    });
    return res.json({
        success: true,
        price
    });
});

module.exports = app;