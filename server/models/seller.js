const mongoose=require('mongoose');


const Seller=mongoose.Schema({
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
        trim:true
      },
      email: {
        type: String,
        required: true,
        unique: true, 
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
      },
      properties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property'
      }]
})
module.exports=mongoose.model('Seller',Seller);