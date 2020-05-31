const router = require('express').Router();
const controller = require('../controllers/controller');

router.get('/get/:page', controller.get);

router.get('/search/:page/:search', controller.search);

router.post('/save', controller.save);

router.post('/update/:id', controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router;