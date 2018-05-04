const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  userId : {
    type : String,
    required: true
  },
  postId : {
    type: String,
    required: true,
  },
  value : {
    type : Number,
    min : 1,
    max: 5
  },
  createdAt: {
    type : String,
    default: Date.now(),
  }
});

/*
RatingSchema.methods.hasUserRated = async function(userid, postid){
  try{
    const hasRated = await this.model('Rating').findOne({
      userid : userid, postid : postid
    });
    
    if(!hasRated){
      
    }
  }
  catch(err){
    console.log(err);
    return err;
  }
}

*/



const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;