let AWS = require('aws-sdk');
let s3 = new AWS.S3();

const uuid4 = require('uuid/v4');

const bucket = "textile-raverlyesque-test";

/*
function addObject(fileId, file){
  return s3.putObject({
    Bucket : bucket,
    Body : file.buffer,
    Key : fileId,
    ContentType: file.mimetype,
  }).promise();
}
*/

module.exports = s3;