const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

//connecting to the aws service
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_DEFAULT_REGION,
});

const s3 = new aws.S3();

//file schema contianing for fields and the path of the stored file
const FileSchema = new mongoose.Schema({
  name: String,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// if we are using only local bukcet saving the location of it
FileSchema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

//for removing the file
FileSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: "csvgjm",
        Key: this.key,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

module.exports = mongoose.model("File", FileSchema);
