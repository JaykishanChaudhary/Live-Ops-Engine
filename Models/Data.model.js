const mongoose=require('mongoose');

const DataSchema=new mongoose.Schema({
    // tasks, due dates, reminders,
    tasks:{
        type:String,
        required:true
    },
    reminder:{
     type:String,
     required:true
    },
    dueDate:{
        type:Date,
    }
})

const DataModel=mongoose.model("Data",DataSchema);

module.exports=DataModel