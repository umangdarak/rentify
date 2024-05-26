const mongoose=require('mongoose');


const Buyer=mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName:{
        type:String,
        required:true,
        trim:true,
      },
      password: {
        type: String,
        required: true,
      },
      phoneNumber:{
        type:String,
        required:true,
      },
      email: {
        type: String,
        required: true,
        unique: true, 
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
      },
});

module.exports=mongoose.model('Buyer',Buyer);