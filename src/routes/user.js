const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/profile', isLoggedIn, async (req, res) => {
  const DNI = req.user.DNI;

  const stmt = `SELECT * FROM events WHERE user_dni = :DNI AND state = 'ACTIVE' ORDER BY date_start`;
  const stmt2 = `SELECT * FROM alarms WHERE user_dni = :DNI ORDER BY issued_at DESC`;
  const binds = [DNI];

  const resultQuery1 = await executeQuery(stmt, binds);
  const resultQuery2 = await executeQuery(stmt2, binds);

  const payload = {
    user: req.user,
    events: resultQuery1.rows, // Rows selected
    alarms: resultQuery2.rows, // Rows selected
  };

  res.render('users/profile', payload);
});

module.exports = router;
