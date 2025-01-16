import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import AppError from '../errors/AppError';
import fs from 'fs';
// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});

export const uploadImageIntoCloudinary = async (
  path: string,
  imageName: string,
) => {
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      throw new AppError(409, error.message);
    });
  fs.unlink(path, (err) => {
    if (err) {
      throw new AppError(409, err.message);
    } else {
      console.log('File is deleted successfully');
    }
  });
  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
