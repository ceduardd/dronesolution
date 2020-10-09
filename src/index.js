const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const SocketIO = require('socket.io');
const http = require('http');
const path = require('path');

// Initializations
const app = express();
const server = http.createServer(app);

// Socket.io
const io = SocketIO(server);
module.exports = {
  io,
  app,
};

require('./sockets/socket');
require('./config');
require('./lib/local-auth');

// Settings
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

// Middlewares
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

// Global
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.failure = req.flash('failure');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
server.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
