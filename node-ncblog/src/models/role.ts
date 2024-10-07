import dotenv from "dotenv";
import Joi from "joi";
import mongoose, { Document, Model, Types } from "mongoose";
import { IPermission } from "./permission.js";

dotenv.config();

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  permissions: (mongoose.Types.ObjectId | IPermission)[];
}

export const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['superadmin', 'admin', 'user', 'blogauthor'],
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    minlength: 5,
    trim: true,
  },
  permissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Permission',
    required: true
  }
},
{ timestamps: true }
);

const RoleModel: Model<IRole> = mongoose.model<IRole>('Role', roleSchema);

export function validateRole(role: typeof RoleModel) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).optional(),
    permissions: Joi.array().items(Joi.string().hex().length(24)).optional()
  });

  return schema.validate(role);
}

export default RoleModel
