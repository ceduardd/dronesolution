const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');
const { formatDate } = require('../lib/handlebars');
const oracledb = require('oracledb');

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

  // console.log(plan_id);

  res.redirect(`/details/${plan_id}`);
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;

  const stmt = `SELECT * FROM agreements WHERE id = :id`;
  const binds = [id];

  const resultQuery = await executeQuery(stmt, binds);

  const details = resultQuery.rows[0];

  // console.log(details);

  const { DATE_ISSUE, USER_DNI, PLAN_ID, EVENT_ID } = details;

  const stmt2 = `SELECT fullname FROM users WHERE dni = :USER_DNI`;
  const resultQuery2 = await executeQuery(stmt2, [USER_DNI]);
  const { FULLNAME } = resultQuery2.rows[0];

  const stmt3 = `SELECT name_plan, price FROM plans WHERE id = :PLAN_ID`;
  const resultQuery3 = await executeQuery(stmt3, [PLAN_ID]);
  const { NAME: plan_name, PRICE: price } = resultQuery3.rows[0];

  const stmt4 = `SELECT name, date_start FROM events WHERE id = :EVENT_ID`;
  const resultQuery4 = await executeQuery(stmt4, [EVENT_ID]);
  const { NAME: name_event, DATE_START: date_event } = resultQuery4.rows[0];

  const agreement = {
    date: DATE_ISSUE,
    name: FULLNAME,
    dni: USER_DNI,
    plan_name,
    price,
    name_event,
    date_event,
  };

  console.log(agreement);

  res.render('users/agreement', agreement);
});

module.exports = router;
