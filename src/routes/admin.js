const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');

router.get('/admin/signin', (req, res) => {
  res.render('admin/signin');
});

router.post('/admin/signin', async (req, res) => {
  const { email, password } = req.body;
  const resultQuery = await executeQuery(
    `SELECT * FROM administrators WHERE email = :email`,
    [email]
  );

  if (resultQuery.rows.length > 0) {
    const admin = resultQuery.rows[0];
    const validPassword = admin.PASSWORD === password;
    if (validPassword) {
      res.redirect('/admin/dashboard');
    } else {
      req.flash('failure', 'Contraseña incorrecta');
    }
  } else {
    req.flash('failure', 'El admin no existe');
    res.redirect('/admin/signin');
  }
});

router.get('/admin/dashboard', async (req, res) => {
  const resultQuery = await executeQuery(
    `SELECT users.fullname, events.name, events.description, events.date_start
    FROM users
    INNER JOIN events ON users.dni = events.user_dni
    WHERE (events.state = 'ACTIVE' OR events.state = 'SUBSCRIBED') AND rownum <= 4
    ORDER BY events.date_start`
  );

  const payload = {
    events: resultQuery.rows,
  };

  // console.log(payload);

  res.render('admin/dashboard', payload);
});

router.get('/admin/statics', async (req, res) => {
  const { rows: basic } = await executeQuery(
    `SELECT fullname, dni, phone 
    FROM users 
    WHERE dni IN (SELECT user_dni FROM agreements 
    WHERE plan_id = (SELECT id FROM plans 
    WHERE name_plan = 'Básico'))`
  );

  const { rows: standar } = await executeQuery(
    `SELECT fullname, dni, phone 
    FROM users 
    WHERE dni IN (SELECT user_dni FROM agreements 
    WHERE plan_id = (SELECT id FROM plans 
    WHERE name_plan = 'Estándar'))`
  );

  const { rows: premium } = await executeQuery(
    `SELECT fullname, dni, phone 
    FROM users 
    WHERE dni IN (SELECT user_dni FROM agreements 
    WHERE plan_id = (SELECT id FROM plans 
    WHERE name_plan = 'Premium'))`
  );

  const { rows: unsubscribed } = await executeQuery(
    `SELECT users.fullname, events.name, unsubscribed_events.reason 
    FROM users
    INNER JOIN events ON users.dni = events.user_dni
    INNER JOIN unsubscribed_events ON unsubscribed_events.event_id = events.id
    WHERE events.state = 'UNSUBSCRIBED'`
  );

  const { rows: registers } = await executeQuery(
    `SELECT COUNT(dni) AS registers FROM users`
  );

  const registersCount = registers[0].REGISTERS;

  const payload = {
    basic,
    standar,
    premium,
    unsubscribed,
    registersCount,
  };

  res.render('admin/statics', payload);
});

module.exports = router;
