const express = require("express");
const router = express.Router();
const sectorData = require("../controllers/sectors.controller");

//routes

router.post("/logIn", sectorData.validateLogIn);
router.post("/register", sectorData.registerData);

module.exports = router;
