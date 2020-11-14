require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRoute = require('./routes/courses');
const chapterRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const mediaRoute = require('./routes/media')
const ordersRoute = require('./routes/orders');
const paymentsRoute = require('./routes/payments');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const imageCoursesRouter = require('./routes/ImageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');

const verifyToken = require('./middlewares/verifyToken');


const app = express();

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRoute);
app.use('/chapters', verifyToken, chapterRouter);
app.use('/lessons', verifyToken, lessonsRouter);
app.use('/media', mediaRoute);
app.use('/orders', ordersRoute);
app.use('/payments', paymentsRoute);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, mentorsRouter);
app.use('/image-courses', verifyToken, imageCoursesRouter);
app.use('/my-courses', verifyToken, myCoursesRouter);
app.use('/reviews', verifyToken, reviewsRouter);

module.exports = app;