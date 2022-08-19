const express = require('express');
const router = express.Router();
const { getAllUser, signUp, login }  = require("../controllers/userController");




router.get('/', getAllUser)
router.post('/signup', signUp)
router.post('/login', login)



module.exports = router