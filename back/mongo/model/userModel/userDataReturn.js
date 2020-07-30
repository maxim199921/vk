class UserDataReturn {
    constructor(data) {
        this._id = data._id;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.country = data.country;
        this.status = data.status;
        this.publicChannels = data.publicChannels;
        this.privateChannels = data.privateChannels;
        this.friends = data.friends;
        this.applicationToAddFriend = data.applicationToAddFriend;
        this.applicationToDeleteFriend = data.applicationToDeleteFriend;
        this.avatarPhoto = data.avatarPhoto;
        this.isFriend = data.isFriend;
        this.photo = data.photo
    }
}

module.exports = UserDataReturn;

