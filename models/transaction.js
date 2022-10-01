const mongoose=require("mongoose");

const transactionSchema= new mongoose.Schema({
  fromname:{
    type:String,
    required:true
  },
  fromemail:{
    type:String,
    required:true
  },
  toname:{
    type:String,
    required:true
  },
  toemail:{
    type:String,
    required:true
  },



});
const History=mongoose.model("transactiondata",transactionSchema);

module.exports=History;
