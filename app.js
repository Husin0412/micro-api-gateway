require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRoute = require('./routes/courses');
const chapterRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const mediaRoute = require('./routes/media')
const orderPaymentsRoute = require('./routes/orderPayments');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const imageCoursesRouter = require('./routes/ImageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook')

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(cors())
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
app.use('/chapters', verifyToken, can('supersu', 'admin'), chapterRouter);
app.use('/lessons', verifyToken, can('supersu', 'admin'), lessonsRouter);
app.use('/media', verifyToken, can('supersu', 'admin', 'student'), mediaRoute);
app.use('/orders', verifyToken, can('supersu', 'admin', 'student'), orderPaymentsRoute);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, can('supersu', 'admin'), mentorsRouter);
app.use('/image-courses', verifyToken, can('supersu', 'admin'), imageCoursesRouter);
app.use('/my-courses', verifyToken, can('supersu', 'admin', 'student'), myCoursesRouter);
app.use('/reviews', verifyToken, can('supersu', 'admin', 'student'), reviewsRouter);
app.use('/webhook', webhookRouter);

module.exports = app;