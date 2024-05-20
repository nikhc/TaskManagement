const mongoose = require("mongoose");

(async function () {
    const m = await mongoose.connect(
      "mongodb+srv://nikhil21fbd:r3sA3sMmv8uarZql@cluster0.oveeltq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(m);
    console.log("Congrats! It is connected");
  })();
  const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    important:{
        type:Boolean,
        default:false
    },
    complete:{
        type:Boolean,
        default:false

    }

  },{timestamps:true})

  const taskModel = mongoose.model("taskModel", taskSchema);
  module.exports = taskModel;
//   $2b$10$DdLJXelH36dGEtI/ZYLLdeSO5RYE3zJTFS0E4q64BmtFZbw6WNmtC
//   $2b$10$AsoPCITzS.lu8Ts9OsY/SeBr0PZQ4bQv69wMwdfyIEIhC8D1yKAvO
//   $2b$10$AsoPCITzS.lu8Ts9OsY/SeBr0PZQ4bQv69wMwdfyIEIhC8D1yKAvO