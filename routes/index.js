const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

router.post('/store', controllers.setService);
router.post('/retrieve', controllers.getServiceById);

module.exports = router;