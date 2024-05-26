const mongoose=require('mongoose');

module.exports = mongoose.connect(process.env.MongoDb).then(()=>{
    console.log("MongoDb connected");
}).catch((e)=>{
    console.log("Not connected",e);
})