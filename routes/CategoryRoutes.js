const express = require('express')
const router = express.Router()
const {requireSignin, isAuth, isAdmin} = require('../controllers/AuthController')
const {create} = require('../controllers/CategoryController')
const {userById} = require('../controllers/UserController')

router.post('/category/create/:userId', requireSignin, isAdmin, isAdmin, create)

router.param('userId', userById)

module.exports = router
