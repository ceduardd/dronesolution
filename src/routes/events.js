const { Router } = require('express');
const router = Router();

const { executeQuery } = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
  const DNI = req.user.DNI;
  const sql = 'SELECT * FROM events WHERE user_dni = :DNI';
  const resultQuery = await executeQuery(sql, [DNI]);
  console.log(resultQuery.rows);
  res.render('events/panel', { events: resultQuery.rows });
});

router.get('/add', isLoggedIn, (req, res) => {
  res.render('events/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
  const DNI = req.user.DNI;
  const { name, description, dateStart, hourStart } = req.body;
  console.log(req.body);
  const fechaYHora = `${dateStart} ${hourStart}`;
  console.log(fechaYHora);
  const sql = `INSERT INTO events 
              VALUES (EVENT.nextval, :DNI, :name, :description, TO_DATE(:dateStart, 'YYYY-MM-DD'), TO_TIMESTAMP(:fechayHora, 'YYYY-MM-DD HH24:MI'))`;
  const binds = [DNI, name, description, dateStart, fechaYHora];
  const resultQuery = await executeQuery(sql, binds);
  req.flash('success', 'Evento creado satisfactoriamente');
  res.redirect('/events');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM events WHERE id = :id';
  const binds = [id];
  const resultQuery = await executeQuery(sql, binds);
  const event = resultQuery.rows[0];
  res.render('events/edit', { event });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { name, description, dateStart } = req.body;
  const sql = `UPDATE events 
              SET name = :name, 
                  description = :description, 
                  date_start = TO_DATE(:dateStart, 'YYYY-MM-DD') 
              WHERE id = :id`;
  const binds = [name, description, dateStart, id];
  await executeQuery(sql, binds);
  res.redirect('/events');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM events WHERE id = :id';
  const binds = [id];
  await executeQuery(sql, binds);
  res.redirect('/events');
});

module.exports = router;
