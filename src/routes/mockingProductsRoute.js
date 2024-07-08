const express = require('express');
const router = express.Router();
const generateMockProducts = require('../models/productMock.js');

router.get('/', (req, res) => {
  const products = generateMockProducts(100);
  res.json(products);
});

module.exports = router;
