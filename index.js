const mongoose = require('mongoose');
const studentModel = require('./models/student.model1')

//write code to connect with database
mongoose.connect("mongodb://127.0.0.1:27017/be_demodb"); //where to connect 

const db = mongoose.connection; //start the connection with mongodb--give order to connect

db.on("error", () => {
    console.log("Error while connecting with mongodb")
});

db.once("open", () => {
    console.log("successfully connected to mongodb")

    //logic to insert data into db
    init()

    //Running the queries on MongoDB
    dbQueries()
});

async function init() {
    const student = {
        name: "riya",
        age: 22,
        email: "riya05962@gmail.com",
        subjects: ["nodejs", "mongodb"]
    }

    const stu_obj = await studentModel.create(student)

    console.log(stu_obj)

}

async function dbQueries() {
    /**
    * Read the student data
    */

    //Read the student data based on the ID
    //If we provide the id that do not exit that it will give output as null
    try {
        const student = await studentModel.findById("65e89cb949d27567d02c0cb1")//asynchronous call
        console.log(student)
    } catch (err) {
        console.log(err)
    }

    //Read the student data based on name
    try {
        //---if you provide name that do not exist then it will return empty array->[]---
        //const students = await studentModel.find({name:"mohan"})//it will show all documents where name is equal to riya

        //---if you provide name that do not exist then it will return null 
        //const students = await studentModel.findOne({name:"riya"})//it will show only one documents where name is equal to riya

        //const students = await studentModel.find({})//it will act as find all and show all documets present in collection
        //console.log(students)

        //note--we can also search based on email or other field
    } catch (err) {
        console.log(err)
    }

    /**
    * Deals with multiple conditions
    */
    const stds = await studentModel.where("age").gt("10").where("name").equals("riya").limit(2)
    console.log(stds)

    /**
     * Delete one document where name = "riya"
     */
    const student = await studentModel.deleteOne({name:"riya"})
    console.log(student)
}


