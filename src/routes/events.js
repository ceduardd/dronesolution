const { Router } = require('express');
const router = Router();

const oracledb = require('oracledb');
const { executeQuery } = require('../database');

const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
  res.render('events/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
  // console.log(req.body);

  const DNI = req.user.DNI;

  const {
    name,
    description,
    date,
    hour,
    duration,
    num_attendees,
    capacity_allowed,
    type,
  } = req.body;

  const date_start = `${date} ${hour}`;
  const capacity_percent = capacity_allowed / 100;

  const stmt = `INSERT INTO events (
                  user_dni,
                  name,
                  description,
                  date_start,
                  duration,
                  num_attendees,
                  capacity_allowed,
                  type
                ) VALUES (
                  :DNI,
                  :name,
                  :description,
                  TO_TIMESTAMP(:date_start, 'YYYY-MM-DD HH24:MI'),
                  :duration,
                  :num_attendees,
                  :capacity_percent,
                  :type
                ) RETURNING id INTO :id`;

  const binds = {
    DNI,
    name,
    description,
    date_start,
    duration,
    num_attendees,
    capacity_percent,
    type,
    id: {
      type: oracledb.NUMBER,
      dir: oracledb.BIND_OUT,
    },
  };

  const resultQuery = await executeQuery(stmt, binds); // Saving new event

  const event_id = resultQuery.outBinds.id[0];

  console.log(event_id);

  const { name_place, address, type_place, capacity_max } = req.body;

  const stmt2 = `INSERT INTO places (
                  event_id,
                  name,
                  address,
                  type,
                  capacity_max
                ) VALUES (
                  :event_id,
                  :name_place,
                  :address,
                  :type_place,
                  :capacity_max
                )`;

  const binds2 = [event_id, name_place, address, type_place, capacity_max];
  console.log(binds2);

  await executeQuery(stmt2, binds2); // Saving new place

  req.flash('success', 'Evento creado satisfactoriamente');

  res.redirect('/user/profile');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const stmt = `SELECT * FROM events WHERE id = :id`;
  const stmt2 = `SELECT * FROM places WHERE event_id = :id`;

  const binds = [id];

  const resultQuery = await executeQuery(stmt, binds);
  const event = resultQuery.rows[0]; // Rows selected

  const resultQuery2 = await executeQuery(stmt2, binds);
  const place = resultQuery2.rows[0]; // Rows selected

  res.render('events/edit', { event, place });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    date,
    hour,
    duration,
    num_attendees,
    capacity_allowed,
    // type, can't edit
  } = req.body;

  const date_start = `${date} ${hour}`;
  const capacity_percent = capacity_allowed / 100;

  const stmt = `UPDATE events 
                SET
                  name = :name, 
                  description = :description, 
                  date_start = TO_TIMESTAMP(:date_start, 'YYYY-MM-DD HH24:MI'),
                  duration = :duration,
                  num_attendees = :num_attendees,
                  capacity_allowed = :capacity_percent
                WHERE id = :id`;

  const binds = [
    name,
    description,
    date_start,
    duration,
    num_attendees,
    capacity_percent,
    id,
  ];

  await executeQuery(stmt, binds); // Updating event

  const { name_place, address, capacity_max } = req.body;

  const stmt2 = `UPDATE places 
                SET 
                  name = :name_place,
                  address = :address,
                  capacity_max = :capacity_max
                WHERE event_id = :id`;

  const binds2 = [name_place, address, capacity_max, id];

  await executeQuery(stmt2, binds2); // Updating place

  req.flash('success', 'Evento editado satisfactoriamente');

  res.redirect('/user/profile');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const stmt = `DELETE FROM events WHERE id = :id`;

  const binds = [id];

  await executeQuery(stmt, binds); // Deleting event

  req.flash('success', 'Evento borrado de los registros');

  res.redirect('/user/profile');
});

module.exports = router;
