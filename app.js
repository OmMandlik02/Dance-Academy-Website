const express=require("express");
const path =require("path");
const fs = require("fs");
const app= express();
var mongoose = require('mongoose');
var bodyparser = require("body-parser")
const port=80;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/OmKart');
    console.log("Bro finally connected ");
}
  
const contactSchema = new mongoose.Schema({
    name: String,
    email :String,
    age:String,
    gender:String,
    contact:String

  });
  const Contact = mongoose.model('Contact', contactSchema);
  

// Express specific stuffs
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded())

// Pug specific stuffs
app.set('view engine','pug');// Set the template engine as pug
app.set('views',path.join(__dirname,'views'));// Set the views directory

// Endpoints
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})

app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save();
    res.status(200).render('contact.pug')
})
app.listen(port,()=>{
    console.log(`The application is running on port ${port}`)
})