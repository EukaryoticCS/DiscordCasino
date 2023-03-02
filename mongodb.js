const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

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
        return null;
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

async function updateUser(discordID, bet) {
    await User.findOneAndUpdate({discordID: discordID}, {$inc: {availableFunds: bet}});
}

module.exports = {
    User,
    getUser,
    createUser,
    updateUser
}