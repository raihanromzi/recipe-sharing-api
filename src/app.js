const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const welcomeAPIRouter = require('./routes/home/welcome-api');
const createUser = require('./routes/user/postUser');
const getAllUsers = require('./routes/user/getAllUsers');
const getUser = require('./routes/user/getUser');
const createRecipe = require('./routes/Recipe/postRecipe');
const deleteUser = require('./routes/user/deleteUser');
const getAllRecipesUser = require('./routes/Recipe/getAllRecipesUser');
const updateUser = require('./routes/user/putUser');
const updateRecipe = require('./routes/Recipe/putRecipe');
const deleteRecipe = require('./routes/Recipe/deleteRecipe');
const getAllRecipes = require('./routes/Recipe/getAllRecipes');

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
app.use('/api/v1/', deleteUser);
app.use('/api/v1/', getAllRecipesUser);
app.use('/api/v1/', updateUser);
app.use('/api/v1/', updateRecipe);
app.use('/api/v1/', deleteRecipe);
app.use('/api/v1/', getAllRecipes);

module.exports = app;
