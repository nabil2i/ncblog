import Joi from "joi";
import mongoose, { Model } from "mongoose";
// import AutoIncrement from "mongoose-sequence";
import dotenv from "dotenv";
import { Document } from "mongoose";

dotenv.config();

export interface IDraftPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  body: string;
  img: string;
  slug: string;
  postAuthorId: mongoose.Types.ObjectId;
  // comments: mongoose.Types.ObjectId[];
  tags: string[];
  category: string;
  // likeCount: number;
  // commentCount: number;
  status: string;
  deletionStatus: string;
  lastEditedAt: Date;
  publishedPostId: mongoose.Types.ObjectId;
  // publishedAt: Date;
  // archivedAt: Date;
}

// const AutoIncrementCounter = AutoIncrement(mongoose);

export const draftPostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    minlength: 0,
    maxlength: 255,
    trim: true,
  },
  body: {
    type: String,
    minlength: 0,
    trim: true,
  },
  img: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/ncblog-b9e81.appspot.com/o/defaultblogimage.jpg?alt=media&token=83769dd6-ac79-45ec-88da-da6722f869f1"
  },
  slug: {
    type: String,
    // unique: true
  },
  postAuthorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  publishedPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  // comments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment',
  // }],
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    default: "Uncategorized"
  },
  
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  deletionStatus: { 
    type: String, 
    enum: ['active', 'deleted'], 
    default: 'active' 
  },
  lastEditedAt: { 
    type: Date,
    default: Date.now
  },
  },
  { timestamps: true },
);

const DraftPostModel: Model<IDraftPost> = mongoose.model<IDraftPost>('DraftPost', draftPostSchema);

export function validateDraftPost(dratPost: typeof DraftPostModel) {
  const schema = Joi.object({
    title: Joi.string().min(0).max(255),
    body: Joi.string().min(0),
    postAuthorId: Joi.string().hex().length(24),
    // userId: Joi.object.objectId().required(),
    img: Joi.string().min(5),
    category: Joi.string().min(5),
    tags: Joi.array().items(Joi.string().min(5))
  });

  return schema.validate(dratPost);
}

export function validateUpdateDraftPost(dratPost: typeof DraftPostModel) {
  const schema = Joi.object({
    title: Joi.string().min(0).max(255),
    body: Joi.string().min(0),
    postAuthorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    img: Joi.string().min(5),
    category: Joi.string().min(5),
    tags: Joi.array().items(Joi.string().min(5)),
  });

  return schema.validate(dratPost);
}

export default DraftPostModel
