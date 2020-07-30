class User {
  constructor(data) {
    this.id_user = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.avatarPhoto = data.avatarPhoto
  }
}

module.exports = User;
