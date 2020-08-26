const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { encryptPassword, matchPassword } = require('../lib/helpers');
const { executeQuery } = require('../database');

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const sql = 'SELECT * FROM users WHERE email = :email';
      const binds = [email];

      const resultQuery = await executeQuery(sql, binds);
      const rows = resultQuery.rows;

      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await matchPassword(password, user.PASSWORD);

        if (validPassword) {
          done(
            null,
            user,
            req.flash('success', 'Bienvenido ' + user.FIRSTNAME)
          );
        } else {
          done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
      } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
      }
    }
  )
);

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { firstname, DNI } = req.body;
      const encryptPass = await encryptPassword(password);

      const sql = 'SELECT * FROM users WHERE dni = :DNI';
      const binds = [DNI];

      const resultQuery = await executeQuery(sql, binds);
      const rows = resultQuery.rows;

      if (rows.length === 0) {
        const sql =
          'INSERT INTO users VALUES (:DNI, :firstname, :email, :encryptPass)';
        const binds = [DNI, firstname, email, encryptPass];
        await executeQuery(sql, binds);

        const newUser = {
          DNI,
          firstname,
          email,
          encryptPass,
        };

        done(null, newUser);
      } else {
        return done(
          null,
          false,
          req.flash('message', 'Esta cédula ya está registrada')
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.DNI);
});

passport.deserializeUser(async (dni, done) => {
  const sql = 'SELECT * FROM users WHERE dni = :dni';
  const binds = [dni];
  const resultQuery = await executeQuery(sql, binds);
  const rows = resultQuery.rows;
  done(null, rows[0]);
});
