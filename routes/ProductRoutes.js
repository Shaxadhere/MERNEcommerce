const express = require('express')
const router = express.Router()
const {requireSignin, isAuth, isAdmin} = require('../controllers/AuthController')
const {create} = require('../controllers/ProductController')
const {userById} = require('../controllers/UserController')

router.post('/product/create/:userId', requireSignin, isAdmin, isAdmin, create)

router.param('userId', userById)
router.param('userId', userById)

module.exports = router
