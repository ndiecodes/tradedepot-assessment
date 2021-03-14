const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
/*
 * enable await on this callback hell
 *
 */
class Storage {
  static upload(file, folder = null) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file,
        { folder: folder || "products" },
        (err, url) => {
          if (err) return reject(err);
          const path = `${url.public_id}.${url.format}`;
          return resolve(path);
        }
      );
    });
  }
  /*
   * get image secure url
   */
  static url(public_id) {
    return cloudinary.url(public_id, {
      secure: true,
      transformation: { fetch_format: "auto", dpr: "auto", quality: "auto" },
    });
  }

  static streamUpload = (file) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
        },
        (error, result) => {
          if (error) return reject(error);
          const path = `${result.public_id}.${result.format}`;
          return resolve(path);
        }
      );

      streamifier.createReadStream(file).pipe(stream);
    });
  };
}

module.exports = Storage;
