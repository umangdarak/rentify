const mongoose=require('mongoose');


const Property=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller'
    },
    place:{
        type:String,
        required:true,
        trim:true,
    },
    area:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:String,
        required:true,
        trim:true
    },
    bedrooms:{
        type:Number,
        required:true,
        trim:true,
    },
    bathrooms:{
        type:Number,
        required:true,
        trim:true,
    },
  
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buyer'
    }],
    picture:Buffer
});

module.exports=mongoose.model('Property',Property);