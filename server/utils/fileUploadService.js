const aws = require("aws-sdk");
const fs = require("fs");
const checkMulterParams = require("../helpers/multerParam");

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const getParams = (folderName, multerParamsObject) => {
  return {
    ACL: "public-read",
    Bucket: process.env.BUCKET_NAME,
    Body: fs.createReadStream(multerParamsObject.filePath),
    ContentType: `${multerParamsObject.contentType}`,
    Key: `${folderName}/${multerParamsObject.filename}`,
  };
};

exports.uploadToS3 = ({ file, folderName, name }) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("File required"));
    }
    const s3 = new aws.S3();
    let multerCheckReturnValue = checkMulterParams({ input: file, name }); // value returned after multer params are checked
    const paramsArray = [];
    if (Array.isArray(file)) {
      for (let item of multerCheckReturnValue) {
        const params = getParams(folderName, item);
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err);
          }

          if (data) {
            fs.unlinkSync(item.filePath);
            paramsArray.push(data.Location);
            if (paramsArray.length === multerCheckReturnValue.length) {
              // Don't resolve until all uploads have been completed.
              resolve(paramsArray);
            }
          }
        });
      }
    } else {
      const params = getParams(folderName, multerCheckReturnValue);

      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }

        if (data) {
          fs.unlinkSync(multerCheckReturnValue.filePath);
          resolve(data.Location);
        }
      });
    }
  }).catch((err) => {
    console.log(err);
  });

exports.deleteFromS3 = ({ filename }) =>
  new Promise((resolve, reject) => {
    if (!filename) {
      reject(new Error("File required"));
    }
    const s3 = new aws.S3();

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      }

      if (data) {
        resolve(success);
      }
    });
  }).catch((err) => {
    console.log(err);
  });
