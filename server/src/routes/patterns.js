const express = require('express');
const Pattern = require('../models/Pattern');
const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer();

const fileUploadFields = [
  {
    name: "images",
    maxCount: 10 
  },
  {
    name: "pdfs",
    maxCount: 1
  }
];

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

  patterns.post('/', upload.fields(fileUploadFields), async (req, res, next) => {
    try{
      const basePattern = new Pattern({
        userId : req.user._id,
        username : req.user.username,
        title : req.body.title,
      });

      const savedBasePattern = await basePattern.save();
      const entryId = savedBasePattern._id;
      
      const databaseLinks = {};
      
      const uploadsPromises = fileUploadFields.map(async (field, index) => {
        let ids = req.body[field.name + "ids"];
        if(!Array.isArray(ids)){
          ids = [ids];
        }
        
        console.log(ids);
        
        databaseLinks[field.name] = [];
        
        const fieldPromises = req.files[field.name].map((file, index) => {
          const tag ="parentType=Pattern&parentId=" + entryId;
          databaseLinks[field.name].push({uuid : ids[index]});
          return(
            s3.putObject({
              Bucket : "textile-raverlyesque-test",
              Body : file.buffer,
              Key : 'uploads/' + ids[index],
              ContentType: file.mimetype,
              ACL : "public-read",
              // Tagging : tag
              // *Tagging costs 1 center per 10,000 objects*
            }).promise()
          );
        });
        
        try{
          return await Promise.all(fieldPromises);
        }
        catch(err){
          throw err;
          //TODO: return failure indexes, so server can remove S3 assets;
        }
      });
      
      console.log(databaseLinks);
      
      await Promise.all(uploadsPromises);
      await Pattern.findByIdAndUpdate(entryId, { $set : databaseLinks });
      
      res.locals.success = true;
      res.locals.data = {};
      
    }catch(err){
      //if failure, delete 
      console.log(err);
      req.flash('error', err);
      res.locals.success = false;
    }
    
    next();
  });
  
  return patterns;
};
