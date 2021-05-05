const express = require('express');
const path = require('path');
const port = 8000;

// reqUIRE db CONNENCTION
const db = require('./config/mongoose');

// REQUIRE SCHEMA
const Contact = require('./models/contact');
const app = express();

// setting view engine property
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views')) // using __dirname will make it dynamic
app.use(express.urlencoded());// app.use indicates that it's a middleware/ THis line is written to use the parser function
// main purpose of the parser function is to make a body key inside req object whose value is the data which is being sent 
// via html form
app.use(express.static('assets'));

/*app.get('/',function(req,res){
    console.log(__dirname); // __dirname gives us the current directory
res.send('cool,it is running or is it?')
});*/

// MIDDLEWARE 1
// app.use(function(req,res,next){
//     req.name="arpan"; // this will put myname key in req. req is an object. req.myname="arpan" is set over here.so req 
//     //object has been changed. middlewares values can also be overridden(like if I set req.name="shishir" it gets changed)
//     console.log('middleware 1 called');
//     next();
// })

// MIDDLEWARE 2
// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     console.log('from mw2',req.name);//req.myname is read over here.
//     next();
// })


var contactList = [
    // variables name in js follow camalcase notations
    {
        name:"arpan",
        number:"111111111"
    },
    {
        name:"shishir",
        number:"2222222222"
    },
    {
            name:"coding ninjas",
        number:"3333333333"
    }

]

app.get('/',function(req,res){

// IN order to display the data from db first I have to fetch it from the database nd them send it to the template(home.ejs) 
 // USING DATABASE 
    Contact.find({},function(err,contact){
        if (err){
            console.log('error in fetching the data from the database');
            return;
        }
        return res.render('home',{
            title:"I'm flying",
            contact_list:contact
        });
    });
   

/*
EARLIER METHOD(VIA contactList arr)
return res.render('home',{ // this(object) is basically called context defining the value of the varibles.
    title:"I'm flying",
    contact_list: contactList
    // key of a context object follow the above mentioned naming convention
});// what this will do is it will look for home file in views folder and renders it
*/

});



app.get('/practise',function(req,res){
    return res.render('practise',{
        title:'playing around with ejs'
    });
});

app.post('/createcontact',function(req,res){
   // return res.redirect('/practise');
   console.log('form controller', req.name);  //req.myname is read over here.
    // console.log(req.body);
   //contactList.push(req.body);
//    var obj={};
//    obj.name=req.body.name;
//    obj.number = req.body.number
//    contactList.push(obj)
//NOW INSTEAD OF PUSHING THE NEW CONTACT IN THE contact_list we'll add it to our database

    Contact.create({
            name: req.body.name,
            number:req.body.number
        }, function(err,newContact){
            if (err){
                console.log('error in creating the contact');
                return;
            }
            console.log('**********', newContact);
            return res.redirect('back');
    });


});


app.get('/deletecontact', function(req, res){
    Contact.findByIdAndDelete(req.query.id, function(err){
        if (err){
            console.log('error in deleting contact');
            return ;
        }
        return res.redirect('back');
    })
})


app.listen(port, function(err){
    if (err){
        console.log('Error in running server', err);
        return;
    }       
    console.log('Yup, My express server is running fine on port',port);
});