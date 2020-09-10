class Dashboard {
  constructor() {
    this.users = [];
  }

  addUser(id, dni, name, email) {
    const newUser = {
      id,
      dni,
      name,
      email,
    };

    this.users.push(newUser);
  }

  getUser(id) {
    const user = this.users.filter((user) => user.id === id);

    return user;
  }

  getUsers() {
    return this.users;
  }

  removeUser(id) {
    const user = this.getUser(id);

    this.users = this.users.filter((user) => user.id != id);

    return user;
  }
}

module.exports = Dashboard;
