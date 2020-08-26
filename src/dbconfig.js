require('./config');

module.exports = {
  dbconfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.CONNECT_STRING,
    _enableStats: true,
  },
};
