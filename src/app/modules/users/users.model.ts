import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty', 'supperAdmin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// middleware
// pre middleware or pre save middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post middleware or after save middleware
userSchema.post('save', async function (doc, next) {
  doc.password = ''; // remove the password in response
  next(); // optional
});
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const user = await User.findOne({ id }).select('+password');
  return user;
};
userSchema.statics.isUserBlocked = async function (status: string) {
  return (await status) === 'blocked';
};
userSchema.statics.isPasswordMatched = async function (
  password: string,
  hashPassword: string,
) {
  return await bcrypt.compare(password, hashPassword);
};
userSchema.statics.isJwtIssuedBeforeChangePassword = function (
  changePasswordTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangeAt = new Date(changePasswordTimeStamp).getTime() / 1000;
  return passwordChangeAt > jwtIssuedTimeStamp;
};
export const User = model<TUser, UserModel>('User', userSchema);
