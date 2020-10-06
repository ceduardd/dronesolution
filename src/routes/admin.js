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

router.get('/admin/dashboard', (req, res) => {
  res.render('admin/dashboard');
});

module.exports = router;
