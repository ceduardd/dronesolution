const { Router } = require('express');
const router = Router();

const oracledb = require('oracledb');

const { executeQuery } = require('../database');
const { formatDate } = require('../lib/handlebars');

router.get('/agreement/:id/:plan', async (req, res) => {
  const { id, plan } = req.params;
  const dni = req.user.DNI;
  const date_issue = formatDate(new Date());

  const stmt = `INSERT INTO agreements(
                  date_issue,
                  user_dni,
                  plan_id, 
                  event_id
                ) VALUES (
                  DATE '${date_issue}',
                  :dni,
                  :plan,
                  :id
                ) RETURNING id INTO :plan_id`;

  const binds = {
    dni,
    plan,
    id,
    plan_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };

  const resultQuery = await executeQuery(stmt, binds);

  let plan_id = resultQuery.outBinds.plan_id[0];

  const stmt2 = `UPDATE events SET state = 'SUBSCRIBED' WHERE id = :id`;

  await executeQuery(stmt2, [id]);

  res.redirect(`/details/${plan_id}`);
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;

  const stmt = `SELECT DATE_ISSUE, USERS.FULLNAME, USERS.DNI, EVENTS.NAME, DATE_START, PLANS.NAME_PLAN, PLANS.PRICE
                FROM agreements
                  INNER JOIN USERS ON USERS.DNI = AGREEMENTS.USER_DNI 
                  INNER JOIN EVENTS ON EVENTS.ID = AGREEMENTS.EVENT_ID
                  INNER JOIN PLANS ON PLANS.ID = AGREEMENTS.PLAN_ID   
                WHERE agreements.id = :id`;

  const binds = [id];

  const resultQuery = await executeQuery(stmt, binds);

  const details = resultQuery.rows[0];

  const payload = {
    details,
    head: 'Detalles',
  };

  // console.log(payload);

  res.render('users/agreement', payload);
});

module.exports = router;
