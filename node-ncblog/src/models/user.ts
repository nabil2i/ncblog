import mongoose, { Model } from "mongoose";
import Joi from "joi"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export interface User {
  // _id: string;
  roles: string[]

}

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  isActive: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  firstname: string;
  lastname: string;
  img: string;
  _doc: any;
  generateAuthToken: () => string;
  generateRefreshToken: () => string;
}


dotenv.config();

export const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  roles: [{
    type: String,
    default: "Standard"
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  img: {
    type: String,
    default: 'https://api.dicebear.com/7.x/bottts/png'
  }
}, { timestamps: true });

// instance method 
userSchema.methods.generateAuthToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      roles: this.roles,
      isActive: this.isActive,
      isAdmin: this.isAdmin,
      img: this.img,
    },
    process.env.NODE_APP_JWT_ACCESS_SECRET!,
    { expiresIn: '2d' }
    // { expiresIn: '1d' }
  );
  // config.get(process.env.JWT_SECRET));
  return accessToken;
}

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { username: this.username},
    process.env.NODE_APP_JWT_ACCESS_SECRET!,
    // { expiresIn: '20s' }
    { expiresIn: '7d' }
  );
  // config.get(process.env.JWT_SECRET));
  return refreshToken;
}

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
// const UserModel = mongoose.model('User', userSchema);

export function validateUser(user: typeof UserModel) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(8).max(255).required(),
    isActive: Joi.boolean(),
  });

  return schema.validate(user);
}

export default UserModel
