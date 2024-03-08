const mongoose = require('mongoose')

//Schema
const studentSchema = new mongoose.Schema({
    name:String,
    age:Number
})

//go ahead and create corresponding collection in DB
module.exports=mongoose.model("student" , studentSchema)
