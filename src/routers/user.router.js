const router = require('express').Router();
const userCotroller = require('./controllers/user.controller');
const likeRouter = require('./like.router');
const mapRouter = require('./map.router');
const Validator = require('./middleware/validate');

router
.get('/books/:id', userCotroller.getBooks)
  .get('/book/:id', userCotroller.getBook)
    .get('/logout', (req, res) => {
      req.session.destroy();
      res.clearCookie('sid').redirect('/');
    })
      

router.post('/book', userCotroller.addbook)
router.patch('/book/:id', Validator.canYouTouchMyBook, userCotroller.updateBook)
router.delete('/book/:id', Validator.canYouTouchMyBook, userCotroller.deleteBook);

router.use('/like', likeRouter)
router.use('/map', mapRouter)

module.exports = router;
