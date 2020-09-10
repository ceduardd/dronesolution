const { Router } = require('express');
const router = Router();

router.get('/admin', (req, res) => {
  // res.send('Admin');

  res.render('admin/dashboard');
});

router.post('/admin/send', (req, res) => {
  const { title, description, id } = req.body;
});

module.exports = router;
