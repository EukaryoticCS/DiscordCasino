const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ProjectGreed:fRL5HIRrZFRbRyK7@projectgreed.kobcu4l.mongodb.net/ProjectGreed?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
    discordID: String,
    availableFunds: Number
}, {versionkey: false}
);

const User = mongoose.model('user', userSchema, 'users')

async function getUser(discordID) { //Will have to await the function to get the user
    // const users = await User.find();
    const user = await User.findOne({discordID: discordID}).exec();
    if (!user) {
        console.log("User doesn't exist!");
    } else {
        // console.log(user);
        return user;
    }
}

async function createUser(discordID) {
    const user = new User({discordID: discordID, availableFunds: 10000});
    user.save();
    console.log("New user made!");
    return user;
}

module.exports = {
    User,
    getUser,
    createUser
}