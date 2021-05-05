//require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

// acquire the connection (to check if it is succesfull)
const db = mongoose.connection;

// if there is an error print error
db.on('error',console.error.bind(console,'error connecting to the database'));

// if it is up and running print message
db.once('open',function(){
    console.log('succesfully connected to the database');
})
// Now finally I have to include this file when I'm firing up my server