// creating schema for the database

// schema is the defination of what fields will be there in the document. A document needs a schema which needs to be define
// in mongoose which then populates the collection using this schema.. IN simpler terms we need to predefine the fields which
// we'll be using


//require mongoose as schema needs to be predifined for mongoose to access and populate the database
const mongoose = require('mongoose');
//creating schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true // this line implies that giving name is mandatory.It can't be skipped. In fact all the validations are put over here.
    },
    number:{
        type:String,
        required:true
    }
});

//telling the name of the collection using this schema
const Contact = mongoose.model('Contact',contactSchema);
module.exports = Contact;
