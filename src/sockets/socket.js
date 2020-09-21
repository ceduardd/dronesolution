const { io, app } = require('../index'); // get socket and server

const Dashboard = require('../classes/dashboard');
const { executeQuery } = require('../database');
const { formatAgo } = require('../lib/handlebars');

const dashboard = new Dashboard();

let idAdmin;

io.on('connection', (socket) => {
  console.log('New user has been connected');
  socket.emit('received', 'Connected to server');

  socket.on('sendNotification', async (notification) => {
    notification.issued_at = formatAgo(notification.issued_at);

    console.log(notification);

    const { dni, type, description } = notification;

    const stmt = `INSERT INTO alarms (
                    user_dni,
                    type,
                    description,
                    issued_at
                  ) VALUES (
                     :dni,
                     :type,
                     :description,
                     LOCALTIMESTAMP(2)
                  )`;

    const binds = [dni, type, description];

    // Save notification log
    await executeQuery(stmt, binds);

    socket.broadcast.to(notification.id).emit('renderMessage', notification);
  });

  socket.on('registerIDAdmin', () => {
    idAdmin = socket.id;
    socket.emit('addUsers', dashboard.getUsers());
  });

  socket.on('registerID', () => {
    let id = socket.id;

    let user = app.locals.user;

    if (user) {
      dashboard.addUser(id, user.DNI, user.FULLNAME, user.EMAIL);

      console.log(idAdmin);

      if (idAdmin) {
        socket.broadcast.to(idAdmin).emit('addUsers', dashboard.getUsers());
      }
    }
  });

  socket.on('disconnect', () => {
    let userDisconnected = dashboard.removeUser(socket.id);
    socket.broadcast.to(idAdmin).emit('addUsers', dashboard.getUsers());
  });
});
