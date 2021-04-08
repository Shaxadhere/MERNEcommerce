const express = require('express')
const router = express.Router()

const {signup} = require('../controllers/UserController')
const {userSignupValidator} = require('../validator')


router.post('/signup', userSignupValidator, signup)

router.post('/signin' , signup)


module.exports = router