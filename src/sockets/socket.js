const { io, app } = require('../index'); // get socket and server
const { executeQuery } = require('../database');
const { formatAgo } = require('../lib/handlebars');
const Dashboard = require('../classes/dashboard');

const dashboard = new Dashboard();

let adminID; // Save ID Admin

io.on('connection', (socket) => {
  console.log('New user has been connected');
  socket.emit('received', 'Connected to server');

  socket.on('sendNotification', async (notification) => {
    notification.issued_at = formatAgo(notification.issued_at);

    const { dni, type, description } = notification;

    // Save notification log
    await executeQuery(
      `INSERT INTO alarms (
        user_dni,
        type,
        description,
        issued_at
      ) VALUES (
        :dni,
        :type,
        :description,
        LOCALTIMESTAMP(2)
      )`,
      [dni, type, description]
    );

    socket.broadcast.to(notification.id).emit('renderMessage', notification);
  });

  socket.on('registerIDAdmin', () => {
    adminID = socket.id;
    socket.emit('addUsers', dashboard.getUsers());
  });

  socket.on('registerID', () => {
    const id = socket.id;

    const user = app.locals.user;

    if (user) {
      dashboard.addUser(id, user.DNI, user.FULLNAME, user.EMAIL);

      if (adminID) {
        socket.broadcast.to(adminID).emit('addUsers', dashboard.getUsers());
      }
    }
  });

  socket.on('disconnect', () => {
    dashboard.removeUser(socket.id);
    socket.broadcast.to(adminID).emit('addUsers', dashboard.getUsers());
  });
});
