const express = require('express');
const Pattern = require('../models/Pattern');
const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer();

module.exports = (s3) => {
  const patterns = express.Router();
  
  patterns.get(':patternid', async (req, res, next) => {
    try{
      const Pattern = await Pattern.findById(req.params.patternid);
      res.locals.success = true;
      res.locals.data = Pattern;
    }catch(err){
      req.flash('error', err);
      req.locals.success = false;
    }
    next();
  });

  patterns.post('/', upload.array('photos', 12), async (req, res, next) => {
    try{
      const basePattern = new Pattern({
        userid : req.user._id,
        username : req.user.username,
        title : req.body.title,
      });
      
      const savedBasePattern = await basePattern.save();
      //add uploaded resources
      
      let ids = req.body.photosid;
      if(!Array.isArray(ids)){
        ids = ids.split('');
      }
      
      const photos = req.files.map((file, index) => {
        async () => {
          try{
            await s3.putObject({
              Bucket : "textile-raverlyesque-test",
              Body : file.buffer,
              Key : ids[index],
              ContentType: file.mimetype,
            })
          }
          catch(err){
            console.log(err);
            return;
          }
        }
      });
      
      
      //await s3.addObject(req.files[0], req.body['photosid'][0]);
      
      /*
      Object.keys(req.files).forEach(fileType => {
        s3.addAllObjects(
          'pattern/' + basePattern.id + '/' + fileType),
          req.files[fileType]
      });
      */
      
      res.locals.success = true;
      res.locals.data = {};
      
    }catch(err){
      console.log(err);
      req.flash('error', err);
      res.locals.success = false;
    }
    
    next();
  });
  
  return patterns;
};
