const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { encryptPassword, matchPassword } = require('../lib/bcrypt');
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
      const stmt = `SELECT * FROM users WHERE email = :email`;
      const binds = [email];

      const resultQuery = await executeQuery(stmt, binds);
      const rows = resultQuery.rows;

      // Any row selected
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await matchPassword(password, user.PASSWORD);

        // Validate password
        if (validPassword) {
          done(null, user, req.flash('success', 'Bienvenido ' + user.FULLNAME));
        } else {
          done(null, false, req.flash('success', 'Contraseña incorrecta'));
        }
      } else {
        return done(null, false, req.flash('success', 'El usuario no existe'));
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
      const { DNI, fullname, phone, home_address } = req.body;

      const encryptPass = await encryptPassword(password);

      const stmt = `SELECT * FROM users WHERE dni = :DNI OR email = :email OR phone = :phone`;
      const binds = [DNI, email, phone];

      const resultQuery = await executeQuery(stmt, binds);
      const rows = resultQuery.rows;

      // No row has been selected
      if (rows.length === 0) {
        const stmt = `INSERT INTO users VALUES (:DNI, :fullname, :email, :encryptPass, :phone, :home_address)`;
        const binds = [DNI, fullname, email, encryptPass, phone, home_address];

        await executeQuery(stmt, binds); // Guardando nuevo usuario

        const newUser = {
          DNI,
          fullname,
          email,
          encryptPass,
          phone,
          home_address,
        };

        done(null, newUser);
      } else {
        return done(
          null,
          false,
          req.flash(
            'success',
            'Correo electrónico, email o teléfono ya ha sido registrado'
          )
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.DNI);
});

passport.deserializeUser(async (dni, done) => {
  const stmt = `SELECT * FROM users WHERE dni = :dni`;
  const binds = [dni];

  const resultQuery = await executeQuery(stmt, binds);
  const rows = resultQuery.rows;

  done(null, rows[0]);
});
