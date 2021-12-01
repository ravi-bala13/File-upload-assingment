const mongoose = require("mongoose");

// step 1
const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/user_profile_uploads");
}

module.exports = connect;