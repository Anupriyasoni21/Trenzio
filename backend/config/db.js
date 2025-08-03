const mongoose=require("mongoose");

const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected sucessfully");
    }catch(error){
        console.error("Connection failed");
        process.exit(1);
    }
};

module.exports =connectDb;