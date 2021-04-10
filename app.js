const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const authRoutes = require('./routes/AuthRoutes')
const userRoutes = require('./routes/UserRoutes')
const categoryRoutes = require('./routes/CategoryRoutes')
const productRoutes = require('./routes/ProductRoutes')
require('dotenv').config()

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    UseCreateIndex: true
}).then(() => console.log(`Database connected`))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())


//routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

//listen
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})