const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//importing all the routes
const ebooksRouter = require('./routes/ebook-routes');
const userRouter = require('./routes/user-routes');
const cartRouter = require('./routes/cart-routes');
const billingRouter = require('./routes/billing-routes');
const rentRouter = require('./routes/rent-routes');
const packageRouter = require('./routes/package-routes');
const lendRouter = require('./routes/lend-routes');

//importing data in .env file
require('dotenv').config();

//database connectivity
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//Mapping all routes to the application
app.use('/ebooks', ebooksRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/billing', billingRouter);
app.use('/rent', rentRouter);
app.use('/package', packageRouter);
app.use('/lend', lendRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})