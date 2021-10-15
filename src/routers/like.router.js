const likeCotroller = require('./controllers/like.controller');
const router = require('express').Router();

router.put('/:id', likeCotroller.like);




module.exports = router;
