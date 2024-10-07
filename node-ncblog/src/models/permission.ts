import dotenv from "dotenv";
import Joi from "joi";
import mongoose, { Document, Model } from "mongoose";

dotenv.config();

export interface IPermission extends Document {
  _id: string;
  name: string;
  description: string;
}

export const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [],
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
},
{ timestamps: true }
);

const PermissionModel: Model<IPermission> = mongoose.model<IPermission>('Permission', permissionSchema);

export function validatePermission(permission: typeof PermissionModel) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).optional(),
  });

  return schema.validate(permission);
}

export default PermissionModel
