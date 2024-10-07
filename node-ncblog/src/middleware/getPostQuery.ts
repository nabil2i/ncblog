import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { makeError } from "../utils/error.js";

// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//   query: CustomQuery & ParsedQs;
// }
interface CustomRequest extends Request{
  postQuery?: {_id?: String, slug?: String };
}

const getPostQuery = async (req: CustomRequest, res: Response, next: NextFunction) => {

  // console.log ("Checking if request has an id or slug...");

  const postIdOrSlug = req.params.id;
  
  // console.log("postIdOrSlug: ", postIdOrSlug)
  
  if (!postIdOrSlug) return next(makeError(400, "Post ID or slug is required"));
  
  const isObjectId = mongoose.Types.ObjectId.isValid(postIdOrSlug);
  
  let postQuery;
  if (isObjectId) {
    postQuery = { _id: postIdOrSlug };
  } else {
    postQuery = { slug: postIdOrSlug };
  }

  req.postQuery = postQuery;
  next();
}

export default getPostQuery;
