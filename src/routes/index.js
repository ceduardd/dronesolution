const { Router } = require('express');
const router = Router();

router.use(require('./authentication'));
router.use('/events', require('./events'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
