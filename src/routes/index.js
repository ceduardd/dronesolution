const { Router } = require('express');
const router = Router();

router.use(require('./authentication'));
router.use('/user', require('./user'));
router.use('/events', require('./events'));
router.use(require('./admin'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
