const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@groupomania.anmym.mongodb.net/Groupomania")
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to Connect to MongoDB', err));