require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRoute = require('./routes/courses');
const mediaRoute = require('./routes/media')
const ordersRoute = require('./routes/orders');
const paymentsRoute = require('./routes/payments')


const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRoute);
app.use('/media', mediaRoute);
app.use('/orders', ordersRoute);
app.use('/payments', paymentsRoute);

module.exports = app;
