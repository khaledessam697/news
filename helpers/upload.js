const fs = require("fs");
const multer = require("multer");
const apiResponse = require("./apiResponse");
const validations = require("../app/validations/upload.validation");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const storage = multerS3({
  s3: s3,
  bucket: "new-blogs",
  acl: "public-read",
  metadata: function (req, file, cb) {
    try {
      console.log("->", file);
      cb(null, { fieldName: file.fieldname });
    } catch (err) {
      console.log(err);
    }
  },
  key: function (req, file, cb) {
    try {
      let folderName;
      const validationResult = validations.type.validate(req.query.type);
      if (validationResult.error) {
        console.log(validationResult.error);
        throw validationResult.error.message;
      }
      if (req.query.type == "video") {
        folderName = "videos";
      } else {
        folderName = "images";
      }
      console.log(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
      console.log(file);
      if (!file) {
        throw "no file found";
      }
      const fileTypes = ["jpeg", "jpg", "png", "mp4", "avi", "Webm"];
      if (
        !fileTypes.includes(
          file.originalname
            .split(".")
            [file.originalname.split(".").length - 1].toLowerCase()
        )
      ) {
        throw "not supported type";
      }
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      console.log(
        "ppppppppppppppppppathhhhhhhhhhhh",
        "my-uploads/" +
          folderName +
          "/" +
          file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
      cb(
        null,
        "my-uploads/" +
          folderName +
          "/" +
          file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    } catch (err) {
      console.log(err);
      cb(err, "");
    }
  },
});
const upload = multer({ storage: storage });

//const bucketName = "news";
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      try{
    let folderName;
    const validationResult = validations.type.validate(req.query.type);
    if (validationResult.error) {
      console.log(validationResult.error);
      throw validationResult.error.message;
    }
    if (req.query.type == "video") {
      folderName = "videos";
    } else {
      folderName = "images";
    }
    cb(null, "/my-uploads/" + folderName);
    } catch (err) {
      console.log(err);
      cb(err, "");
  }},
  filename: function (req, file, cb) {
    try {
      console.log(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
      console.log(file);
      if (!file) {
        throw "no file found";
      }
      const fileTypes = ["jpeg", "jpg", "png", "mp4", "avi", "Webm"];
      if (
        !fileTypes.includes(
          file.originalname
            .split(".")
            [file.originalname.split(".").length - 1].toLowerCase()
        )
      ) {
        throw "not supported type";
      }
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    } catch (err) {
      console.log(err);
      cb(err, "");
    }
  },
});*/

/*
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read-write",
    metadata: function (req, file, cb) {
      try {
        console.log("->", file);
        cb(null, { fieldName: file.fieldname });
      } catch (err) {
        console.log(err);
      }
    },

    key: function (req, file, cb) {
      try {
        const fileTypes = [
          "pdf",
          "jpeg",
          "jpg",
          "png",
          "HEIC",
          "heic",
          "HEIF",
          "heif",
          "xlsx",
        ];
        let ext = file.originalname.split(".");

        console.log(ext);

        if (!fileTypes.includes(ext[ext.length - 1])) {
          throw "not supported type";
        }

        console.log(req.query);

        let re = /[&\/\\#,+()$~%'":*?<>{} ]/gi;
        let currentdate = new Date();
        let datetime =
          "Last Sync: " +
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " @ " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds();

        if (req.query.type === "user") {
          console.log(file);
          cb(
            null,
            `requests/${req.user._id}-user/` +
              datetime +
              file.originalname.replace(re, "_")
          );
        } else if (req.query.type === "signature") {
          cb(
            null,
            `signatures/` + datetime + file.originalname
          );
        } else if (req.query.type === "payroll") {
          cb(null, `payroll/` + datetime + file.originalname.replace(re, "_"));
        } else if (req.query.type === "profile") {
          console.log("---->", file);

          cb(null, `profile/` + datetime + file.originalname.replace(re, "_"));
        } else if (req.query.type === "reviews") {
          console.log("---->", file);

          cb(null, `reviews/` + datetime + file.originalname.replace(re, "_"));
        } else if (req.query.type === "blog") {
          console.log("---->", file);

          cb(null, `blog/` + datetime + file.originalname.replace(re, "_"));
        } else {
          cb(null, `any/` + datetime + file.originalname.replace(re, "_"));
        }
      } catch (err) {
        console.log(err);
        cb(err, "");
      }
    },
  }),
});*/

module.exports = upload;
