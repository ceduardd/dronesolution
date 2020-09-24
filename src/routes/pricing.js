const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../lib/auth');

router.get('/pricing/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;
  const payload = {
    id,
    head: 'Planes',
  };
  res.render('users/pricing', payload);
});

module.exports = router;
