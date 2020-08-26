const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');

// initializations
const app = express();
require('./config');
require('./database');
require('./lib/local-auth');

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);
app.set('view engine', '.hbs');

// middlewares
app.use(
  session({
    secret: 'dronesolution-session',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// global
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});

// routes
app.use(require('./routes'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
