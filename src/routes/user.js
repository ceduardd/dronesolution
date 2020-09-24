const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');

const { isLoggedIn } = require('../lib/auth');

router.get('/profile', isLoggedIn, async (req, res) => {
  const DNI = req.user.DNI;

  const stmt1 = `SELECT * FROM events WHERE user_dni = :DNI AND state = 'ACTIVE' ORDER BY date_start`;
  const stmt2 = `SELECT * FROM events WHERE user_dni = :DNI AND state = 'SUBSCRIBED' ORDER BY date_start`;
  const stmt3 = `SELECT * FROM alarms WHERE user_dni = :DNI ORDER BY issued_at DESC`;
  const binds = [DNI];

  const resultQuery1 = await executeQuery(stmt1, binds);
  const resultQuery2 = await executeQuery(stmt2, binds);
  const resultQuery3 = await executeQuery(stmt3, binds);

  const payload = {
    user: req.user,
    head: 'Dashboard',
    events: resultQuery1.rows, // Rows selected
    subscribed: resultQuery2.rows,
    alarms: resultQuery3.rows, // Rows selected
  };

  res.render('users/profile', payload);
});

router.get('/history', isLoggedIn, async (req, res) => {
  const dni = req.user.DNI;

  const stmt = `SELECT DATE_ISSUE, USERS.FULLNAME, USERS.DNI, EVENTS.NAME, DATE_START, PLANS.NAME_PLAN, PLANS.PRICE 
                FROM AGREEMENTS
                  INNER JOIN USERS ON USERS.DNI = AGREEMENTS.USER_DNI 
                  INNER JOIN EVENTS ON EVENTS.ID = AGREEMENTS.EVENT_ID
                  INNER JOIN PLANS ON PLANS.ID = AGREEMENTS.PLAN_ID 
                WHERE USERS.DNI = :dni`;

  const resultQuery = await executeQuery(stmt, [dni]);

  const agrees = resultQuery.rows;
  const payload = {
    head: 'Contratos',
    agrees,
  };
  res.render('users/history', payload);
});

module.exports = router;
