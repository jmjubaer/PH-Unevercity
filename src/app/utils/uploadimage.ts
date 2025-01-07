import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
export const uploadImageIntoCloudinary = (path: string, imageName: string) => {
  (async function () {
    // Configuration
    cloudinary.config({
      cloud_name: config.cloudinary_name,
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    await cloudinary.uploader
      .upload(path, {
        public_id: imageName,
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
      fetch_format: 'auto',
      quality: 'auto',
    });

    console.log(optimizeUrl);
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //   crop: 'auto',
    //   gravity: 'auto',
    //   width: 500,
    //   height: 500,
    // });

    // console.log(autoCropUrl);
    return optimizeUrl;
  })();
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
