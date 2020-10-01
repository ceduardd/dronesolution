const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');
const { isNotLoggedIn } = require('../lib/auth');

router.use(require('./authentication'));
router.use('/user', require('./user'));
router.use('/events', require('./events'));
router.use(require('./admin'));
router.use(require('./pricing'));
router.use(require('./agreement'));

router.get('/', isNotLoggedIn, (req, res) => {
  res.render('index');
});

router.get('/pilots', isNotLoggedIn, async (req, res) => {
  const stmt = `SELECT 
                  fullname,
                  experience,
                  path_img
                FROM pilots`;

  const resultQuery = await executeQuery(stmt);

  const pilots = resultQuery.rows;

  const payload = {
    pilots,
  };

  res.render('pilots', payload);
});

router.get('/drones', isNotLoggedIn, async (req, res) => {
  const stmt = `SELECT
                  brand,
                  description,
                  path_img
                FROM drones`;

  const resultQuery = await executeQuery(stmt);

  const drones = resultQuery.rows;

  const payload = {
    drones,
  };

  res.render('drones', payload);
});

module.exports = router;
