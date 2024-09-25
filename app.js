const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorController');
const tourRouter = require('./routes/tourRouters');
const userRouter = express.Router('./routes/userRouters');

//! 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//! handling unhandled routes
// if this middleware is reached, it means that the request was not handled by any of the routers above
app.all('*', (req, res, next) => {
  //? whatever you pass in next() will be treated as an error by express and will skip all other middlewares and go directly to the error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//! error handling middleware

app.use(globalErrorHandler);

module.exports = app;
