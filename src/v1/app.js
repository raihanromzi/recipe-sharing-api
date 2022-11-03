const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const welcomeAPIRouter = require('./routes/home/welcome-api');
const v1RecipeRouter = require('./routes/Recipe/recipeRoutes');
const v1UserRouter = require('./routes/user/userRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', welcomeAPIRouter);
app.use('/api/v1/', v1UserRouter);
app.use('/api/v1/', v1RecipeRouter);

module.exports = app;
