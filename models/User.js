const mongoose = require('mongoose');
const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    username:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('User',userschema)