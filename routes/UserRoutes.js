const express = require('express')
const router = express.Router()

const {requireSignin, isAuth, isAdmin} = require('../controllers/AuthController')
const {userById} = require('../controllers/UserController')

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)


module.exports = router