// This file exports the necessary knex with config to query database
const env = process.env.ENV || 'development';
const config = require('../knexfile')[env];
module.exports = require('knex')(config);
