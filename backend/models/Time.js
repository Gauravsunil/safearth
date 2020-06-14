const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const TimeSchema=new Schema({
    user:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    project:{
        type:String,
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    timer:{
        type:String,
        required:true
    },
    
})

module.exports=Time=mongoose.model('time',TimeSchema);