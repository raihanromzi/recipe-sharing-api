const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const welcomeAPIRouter = require('./routes/home/welcome-api');
const v1CreateUser = require('./routes/user/createUser');
const v1GetAllUsers = require('./routes/user/getAllUsers');
const v1GetUser = require('./routes/user/getUser');
const v1CreateRecipe = require('./routes/Recipe/createRecipe');
const v1DeleteUser = require('./routes/user/deleteUser');
const v1GetAllRecipesUser = require('./routes/Recipe/getAllRecipesUser');
const v1UpdateUser = require('./routes/user/updateUser');
const v1UpdateRecipe = require('./routes/Recipe/updateRecipe');
const v1DeleteRecipe = require('./routes/Recipe/deleteRecipe');
const v1GetAllRecipes = require('./routes/Recipe/getAllRecipes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', welcomeAPIRouter);
app.use('/api/v1/', v1CreateUser);
app.use('/api/v1/', v1GetAllUsers);
app.use('/api/v1/', v1GetUser);
app.use('/api/v1/', v1CreateRecipe);
app.use('/api/v1/', v1DeleteUser);
app.use('/api/v1/', v1GetAllRecipesUser);
app.use('/api/v1/', v1UpdateUser);
app.use('/api/v1/', v1UpdateRecipe);
app.use('/api/v1/', v1DeleteRecipe);
app.use('/api/v1/', v1GetAllRecipes);

module.exports = app;
