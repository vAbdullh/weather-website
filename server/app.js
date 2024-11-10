var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Import CORS

var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var searchRouter = require('./routes/search');

var app = express();

require('dotenv').config();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: function (origin, callback) {
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      console.error(`CORS blocked request from origin: ${origin}`);
      callback(new Error('CORS policy does not allow access from this origin.'));
    }
  }
}));

app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('/search', searchRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
