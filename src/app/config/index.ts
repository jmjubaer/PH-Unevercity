import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '/.env') });
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URL,

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  supper_admin_password: process.env.SUMMER_ADMIN_PASSWORD,

  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_port: process.env.NODEMAILER_PORT,
  nodemailer_user_email: process.env.NODEMAILER_USER_EMAIL,
  nodemailer_user_pass: process.env.NODEMAILER_USER_PASS,

  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
