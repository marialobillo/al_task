const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

router.post('/store', controllers.setValue);
router.post('/retrieve', controllers.getValueById);

module.exports = router;