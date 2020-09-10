const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
  res.render('events/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
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
                )`;

  const binds = [
    DNI,
    name,
    description,
    date_start,
    duration,
    num_attendees,
    capacity_percent,
    type,
  ];

  await executeQuery(stmt, binds); // Saving new event

  req.flash('success', 'Evento creado satisfactoriamente');

  res.redirect('/user/profile');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const stmt = `SELECT * FROM events WHERE id = :id`;

  const binds = [id];

  const resultQuery = await executeQuery(stmt, binds);
  const event = resultQuery.rows[0]; // Rows selected

  res.render('events/edit', { event });
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
