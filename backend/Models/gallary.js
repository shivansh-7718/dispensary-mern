const mongoose=require("mongoose");

const gallarySchema=new mongoose.Schema({
    link:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{timestamps:true});

const gallaryModel=mongoose.model("gallery",gallarySchema);
module.exports=gallaryModel;