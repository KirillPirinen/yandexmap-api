const router = require('express').Router();
const {User, Product} = require('../../db/models');
const bcrypt = require('bcrypt');
const appError = require('../errors/errors');
const indexCotroller = require('./controllers/index.controller');


router.get('/', indexCotroller.getAllBooks, (req, res) => res.render('index'));




module.exports = router;
