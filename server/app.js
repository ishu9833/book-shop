const express = require('express')
require('dotenv').config()
require('./db/connection')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
//import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')



const app = express();
const port = process.env.PORT


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

//routes middleware

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})