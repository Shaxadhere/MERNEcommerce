const express = require('express')
const router = express.Router()
const {requireSignin, isAuth, isAdmin} = require('../controllers/AuthController')
const {create,productById, read, remove, update} = require('../controllers/ProductController')
const {userById} = require('../controllers/UserController')

//routes
router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAdmin, isAdmin, create)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)

//parameters
router.param('userId', userById)
router.param('productId', productById)

module.exports = router
