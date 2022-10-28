const cleanObj = require('./cleanObj');

const responseSuccess = (code, status, data) =>
  cleanObj({
    code,
    status,
    data,
  });

const responseError = (code, status, errors) =>
  cleanObj({
    code,
    status,
    message: errors,
  });

module.exports = {
  responseSuccess,
  responseError,
};
