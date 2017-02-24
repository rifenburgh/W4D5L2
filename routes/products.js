//Building the Products Routes

const express = require('express');
const router = express.Router();  //Can be used by as if you were using app.route

router.get('/products', (req, res, next) => {
  res.send('Products List Page');
});

router.get('/products/new', (req, res, next) => {});

router.get('/products/remove', (req, res, next) => {});

router.get('/products/:id', (req, res, next) => {});


//This file must be required/imported by app.js
module.exports = router;
