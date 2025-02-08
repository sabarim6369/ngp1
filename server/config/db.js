const mongoose = require("mongoose");
const MONGO_URI ="mongodb+srv://sabarim63690122:Sabari.m6369@sabarim63690122.1oeqz.mongodb.net/ngp";
function db(){
    mongoose.connect(MONGO_URI)
    .then(()=>console.log("connection successful with mongodb"))
    .catch((err)=>console.log("Error connecting with mongodb",err))
}
module.exports=db;