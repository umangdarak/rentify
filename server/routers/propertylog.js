const property = require("./models/property");

const Router = require("express").Router();

Router.post("/property", async (req, res) => {
  try {
    const { name, owner, place, area, price, bedrooms, bathrooms, picture } =
      req.body;
    const bufferData = Buffer.from(picture, "base64");
    const property1 = await property({
      name: name,
      owner: owner,
      place: place,
      area: area,
      price: price,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      picture: bufferData,
    });
    const result = await property1.save();
    res.status(200).send("property uploaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error"+err);
  }
});

Router.post('/getproperty',async(req,res)=>{
    try{
        const {id}=req.body;
        const property1=await property.find({owner:id});
        res.json(property1);

    }catch(e){
        res.json(JSON.stringify(e));
    }
})
Router.get('/all',async(req,res)=>{
    try{
        const properties=await property.find({});
        res.json(properties)
    }
    catch(e){
        res.json(JSON.stringify(e));
    }
})

module.exports=Router;