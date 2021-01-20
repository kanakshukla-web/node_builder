const express = require("express");
const router = express.Router();
const prodData = require('../Controllers/products.controller');

//routes
router.get('/dimensionData/:prod_Id', prodData.dimensionData)
router.get('/productData/:id', prodData.productData);
router.get('/dimensionTypes/:prod_name', prodData.dimensionTypes);
router.get('/productDetails/:prod_name', prodData.productDetails);

router.post('/updateProductInfo',prodData.updateProduct);

module.exports = router;