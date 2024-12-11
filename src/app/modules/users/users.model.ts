import { model, Schema } from "mongoose";
import { TUser } from "./users.interface";
import bcrypt from 'bcrypt';
import config from '../../config'; 
const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculty"],
        required: true
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
})




// middleware 
// pre middleware or pre save middleware
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_round))
    next()
  })
  
  // post middleware or after save middleware
  userSchema.post('save', async function (doc,next) {
    doc.password = '' // remove the password in response
    next() // optional
  })
  
export const User = model<TUser>("User",userSchema)