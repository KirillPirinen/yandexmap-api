const mapCotroller = require('./controllers/map.controller');
const router = require('express').Router();

router.get('/', (req, res) => res.render('maps/map'))
        .get('/point', mapCotroller.getPoints)

router.post('/', mapCotroller.addlocation)
router.delete('/:id', mapCotroller.deletePoint);

module.exports = router;
