const express = require('express');
const app = express();
const server2 = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
// SQL Routers

const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL + process.env.DATABASE_NAME, { useNewUrlParser: true })
//mongodb://localhost:27017/case-study
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('public'));
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
//     next();
//   });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
// })

app.use(cors())
// Routes which should be handle request
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/admin', restaurantRoutes);

// My SQL  Routes

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;