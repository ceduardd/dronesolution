const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../lib/auth');

router.get('/pricing/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;
  res.render('users/pricing', { id });
});

module.exports = router;
