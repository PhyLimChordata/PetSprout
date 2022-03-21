const User = require('../../schemas/userSchema');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../../../.env'});

// Updates all users in the database to trim the spaces before and after
// their username and emails.

// Usage: In termainl, in src/backend/function/user, run node trimUserInfor.js
// You don't need to start up the server for this
// Ctrl+C to end after script successfully finish executing

//received from mongodb atlas dashboard
const uri = process.env.URI;

//mongoose starts the connection
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
    console.log("Trim User Email and Username")
    let totalUsers = 0
    let successfulUpdate = 0
    User.find({}, function(err, users) {
        totalUsers = users.length
        users.forEach(user => {
            if (!err) { 
                let username = user.userName.trim()
                let email = user.email.trim()
        
                user.userName = username
                user.email = email
        
                await user.save((e, u) => {
                    if (e) {
                        console.log(`Error occurred while saving user ${user._id}'s information after trimming.`)
                        throw e
                    } else {
                        successfulUpdate++;
                    }
                })
            } else {
                throw err;
            }
        })
    })
    .then(() => {
        console.log(`Finished updating. Total users: ${totalUsers}, successfully updated ${successfulUpdate} users.`)
    })
});

