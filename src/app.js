const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const welcomeAPIRouter = require('./routes/home/welcome-api');
const createUser = require('./routes/user/createUser');
const getAllUsers = require('./routes/user/getAllUsers');
const getUser = require('./routes/user/getUser');
const createRecipe = require('./routes/Recipe/createRecipe');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', welcomeAPIRouter);
app.use('/api/v1/', createUser);
app.use('/api/v1/', getAllUsers);
app.use('/api/v1/', getUser);
app.use('/api/v1/', createRecipe);

module.exports = app;
