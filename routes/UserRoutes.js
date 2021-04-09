const express = require('express')
const router = express.Router()

const {requireSignin} = require('../controllers/AuthController')
const {userById} = require('../controllers/UserController')

router.get('/secret/:userId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)


module.exports = router