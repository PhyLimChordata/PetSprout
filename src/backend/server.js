const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures env vars in .env files
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware - allows us to parse json
// server receives and sends JSON
app.use(cors());
app.use(express.json());

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
});

// Notification Toggled
if(process.env.NOTIFICATIONTOGGLE === 'true') {
	console.log(`Serverside Notifications are enabled. Toggle is located in .env file.`)
} else {
	console.log(`Serverside Notifications are DISABLED. Toggle is located in .env file.`)
}


//Adds routes for express to use
//Example route: http://localhost:5000/example/get
app.use('/api/v1.0.0/user', require('./routes/userRoute'));
app.use('/api/v1.0.0/habit', require('./routes/habitRoute'));
app.use('/api/v1.0.0/setting', require('./routes/settingRoute'));
app.use('/api/v1.0.0/achievements', require('./routes/achievementRoute'));
app.use('/api/v1.0.0/pets', require('./routes/petsRoute'));

//localhost:5000/api/v1.0.0/user

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
