const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const PatternSchema = new Schema({
  userid : { 
    type: String,
    required: true
  },
  username : { 
    type: String,
    required: true,
  },
  title : {
    type : String,
    required: true,
  },
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
  ]
});

const Pattern = mongoose.model("Pattern", PatternSchema);

module.exports = Pattern;