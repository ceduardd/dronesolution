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
    head: 'Dashboard',
    user: req.user,
    profile: true,
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

router.get('/edit', isLoggedIn, async (req, res) => {
  const payload = {
    head: 'Usuario',
  };

  res.render('users/edit', payload);
});

router.post('/edit/:dni', isLoggedIn, async (req, res) => {
  const { fullname, email, phone, home_address } = req.body;
  const dni = req.params.dni;

  const stmt = `UPDATE users SET fullname = :fullname, email = :email, phone = :phone, home_address = :home_address WHERE dni = :dni`;
  const binds = [fullname, email, phone, home_address, dni];

  await executeQuery(stmt, binds);

  // console.log('updated!');

  req.flash('success', 'Detalles actualizados');
  res.redirect('/user/profile');
});

router.get('/orgedit/:dni', isLoggedIn, async (req, res) => {
  const dni = req.params.dni;

  const stmt = `SELECT * FROM organizations WHERE user_dni = :dni`;

  const payload = {
    head: 'Organización',
    dni,
    ok: 0,
  };

  const resultQuery = await executeQuery(stmt, [dni]);

  if (resultQuery.rows.length > 0) {
    const org = resultQuery.rows[0];
    payload.org = org;
    payload.ok = 1;
  }

  res.render('users/org', payload);
});

router.post('/org/:dni/:ok', isLoggedIn, async (req, res) => {
  const { name_org, email_org, phone_org, address_org } = req.body;
  const { dni, ok } = req.params;

  console.log(!ok);

  if (!ok) {
    await executeQuery(
      `INSERT INTO organizations (name_org, email_org, phone_org, address_org, user_dni) VALUES(:name_org, :email_org, :phone_org, :address_org, :user_dni)`,
      [name_org, email_org, phone_org, address_org, dni]
    );
  } else {
    await executeQuery(
      `UPDATE organizations SET name_org = :name_org, email_org = :email_org, phone_org = :phone_org, address_org = :address_org WHERE user_dni = :dni`,
      [name_org, email_org, phone_org, address_org, dni]
    );
  }

  res.redirect(`/user/orgedit/${dni}`);
});

module.exports = router;
