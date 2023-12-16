
const db = require("../database/index")
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.static('public'));
require("dotenv").config()

app.use(cors());
const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
          name:'Product name',
          currency: 'NGN',

        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.send({url: session.url});
  });
  

  module.exports = router