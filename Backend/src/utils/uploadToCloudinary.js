import cloudinary from "../Config/cloudinaryConfig.js";

const uploadToCloudinary = (buffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(buffer);
  });
};

export default uploadToCloudinary;
