const express = require('express')
const router = express.Router()
const {requireSignin, isAuth, isAdmin} = require('../controllers/AuthController')
const {create, categoryById, read, remove, update} = require('../controllers/CategoryController')
const {userById} = require('../controllers/UserController')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router
