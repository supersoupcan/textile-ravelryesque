const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const PatternSchema = new Schema({
  userId : { 
    type: String,
    required: true
  },
  title : {
    type : String,
    required: true,
  },
  rateCount : 0,
  rateValue: 0,
  images : [
    {
      uuid : {
        type : String,
        required : true
      }
    }
  ],
  pdfs : [
    {
      uuid : {
        type : String,
        required : true
      }
    }
  ],
  createdAt : {
    type : Date,
    default : Date.now()
  },
});

const Pattern = mongoose.model("Pattern", PatternSchema);

module.exports = Pattern;