import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CustomModel } from "../models/model.js";

interface CustomQuery {
  page: string;
  limit: string;
  startIndex: string;
  search?: string;
  authorId?: string;
  postId?: string;
  order?: string;
  category?: string;
  slug?: string;
  postAuthorId?: string;
  topParentCommentId?: string;
}

interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
  query: CustomQuery & ParsedQs;
}
interface CustomResponse extends Response {
  paginatedResults?: any;
}

interface MatchCondition {
  $or?: { [key: string]: { $regex: RegExp } } [] ;
  userId?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  authorId?: mongoose.Types.ObjectId;
  slug?: string;
  category?: string;
  postAuthorId?: mongoose.Types.ObjectId;
  topParentCommentId?: mongoose.Types.ObjectId | null;
}

interface ProjectFields {
  [key: string]: number | {
    _id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    img?: string;
  };
}

const paginate = (model: CustomModel) => {
  
  return async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    const modelName = model.modelName;
    const fields = Object.keys(model.schema.paths);
    // console.log(`Fields in the ${modelName} model:`, fields);

    // try {
      let limit = parseInt(req.query.limit)  || 10; // number of results to retrieve for the request
      // position in the list from with to start based on previously fetched results
      const startIndex = parseInt(req.query.startIndex) || 0; 

      let searchTerm = req.query.search;
      let sortOrder: 1 | -1 = req.query.order?.toLowerCase() === 'asc' ? 1 : -1;
      // console.log("sortOrder: ", sortOrder)

      // For posts
      let postAuthorId = req.query.postAuthorId;
      let postId = req.query.postId;
      let category = req.query.category;
      let slug = req.query.slug;

      // For books
      let authorId = req.query.authorId;

      // For comments
      let topParentCommentId = req.query.topParentCommentId
  
      const matchConditions: MatchCondition = {};

      if (searchTerm) {
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        // console.log(searchTerm)

        if (modelName === "Post") {
          matchConditions.$or = [
            { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
            { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            // { tags: { $regex: new RegExp(searchTerm, 'i') } },
            // { category: { $regex: new RegExp(searchTerm, 'i') } },
            // { user: { $regex: new RegExp(searchTerm, 'i') } },
          ]
        }
      }

      if (modelName === "Book") {
        if (authorId) {
          matchConditions.authorId = new mongoose.Types.ObjectId(authorId);
          // console.log(matchConditions.user);
        }
      }

      if (modelName === "Post") {

        if (postAuthorId) {
          matchConditions.postAuthorId = new mongoose.Types.ObjectId(postAuthorId);
          // console.log(matchConditions.user);
        }
  
        // if (postId) {
        //   matchConditions._id = new mongoose.Types.ObjectId(postId)
        // }
  
        if (slug) {
          matchConditions.slug = slug
        }
  
        if (category) {
          matchConditions.category = category
        }
      }
      
      if (modelName === "Comment") {
        if (topParentCommentId) {
          // Fetch replies
          console.log("Fetching the replies");
          matchConditions.topParentCommentId = new mongoose.Types.ObjectId(topParentCommentId);
        } else {
          // Fetch top-level comments: where topParentCommentId is null or undefined
          matchConditions.topParentCommentId = null;
        } 
      }

      const generalLookupStage = (model: CustomModel) => {
        const lookupStages = [];
        // console.log("Fileds for the model: ", fields)
        
        if (fields.includes('userId')) {
          lookupStages.push({
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          });

          lookupStages.push({
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true,
            },
          });
        }

        if (fields.includes('postAuthorId')) {
          lookupStages.push({
            $lookup: {
              from: 'users',
              localField: 'postAuthorId',
              foreignField: '_id',
              as: 'postAuthor',
            },
          });

          lookupStages.push({
            $unwind: {
              path: '$postAuthor',
              preserveNullAndEmptyArrays: true,
            },
          });
        }

        if (fields.includes('authorId')) {
          lookupStages.push({
            $lookup: {
              from: 'authors',
              localField: 'authorId',
              foreignField: '_id',
              as: 'author',
            },
          });
          lookupStages.push({
            $unwind: {
              path: '$author',
              preserveNullAndEmptyArrays: true,
            },
          })
        }

        return lookupStages;
      }

      const generateProjectStage = (model: CustomModel) => {
        const commonFields = {
          _id: 1,
          createdAt: 1,
          updatedAt: 1,
        }

        const projectFields: ProjectFields = {};
        if (modelName === "Post") {
          projectFields.title = 1,
          projectFields.body = 1,
          projectFields.slug = 1,
          projectFields.tags = 1,
          projectFields.likeCount = 1,
          projectFields.commentCount = 1,
          projectFields.isDraft = 1,
          projectFields.isDeleted = 1,
          projectFields.img = 1,
          projectFields.postAuthorId = 1,
          projectFields.category = 1
        } else if (modelName === "Category") {
          projectFields.name = 1
        } else if (modelName === "Comment") {
          projectFields.text = 1,
          projectFields.postId = 1,
          projectFields.userId = 1,
          projectFields.likeCount = 1,
          projectFields.isDeleted = 1,
          projectFields.topParentCommentId = 1,
          projectFields.realParentCommentId = 1,
          projectFields.userRepliedToId = 1,
          // projectFields.replies = 1,
          projectFields.replyCount = 1
        } else if (modelName === "Genre") {
          projectFields.name = 1
        } else if (modelName === "User") {
          projectFields.username = 1,
          projectFields.email = 1,
          projectFields.roles = 1,
          projectFields.isActive = 1,
          projectFields.firstname = 1,
          projectFields.lastname = 1,
          projectFields.img = 1
        } else if (modelName === "Book") {
          projectFields.title = 1,
          projectFields.slug = 1,
          projectFields.subtitle = 1,
          projectFields.about = 1,
          projectFields.genreId = 1,
          projectFields.img = 1,
          projectFields.authorId = 1,
          projectFields.publicationDate = 1,
          projectFields.publisher = 1,
          projectFields.language = 1,
          projectFields.pageCount = 1,
          projectFields.size = 1,
          projectFields.dimensions = 1,
          projectFields.isbn = 1,
          projectFields.link = 1
        } else if (modelName === 'Role') {
          projectFields.name = 1
          projectFields.description = 1,
          projectFields.permissions = 1
        } else if (modelName === 'Permission') {
          projectFields.name = 1
          projectFields.description = 1
        }
        
        if (fields.includes('userId')){
          projectFields.userId = {
            _id: '$user._id',
            username: '$user.username',
            firstname: '$user.firstname',
            lastname: '$user.lastname',
            img: '$user.img',
          }
        }
        if (fields.includes('authorId')){
          projectFields.authorId = {
            _id: '$author._id',
            firstname: '$author.firstname',
            lastname: '$author.lastname',
          }
        }
        if (fields.includes('postAuthorId')){
          projectFields.postAuthorId = {
            _id: '$postAuthor._id',
            firstname: '$postAuthor.firstname',
            lastname: '$postAuthor.lastname',
          }
        }
        // if (fields.includes('comment')){
        //   projectFields.parent = {
        //     _id: '$author._id',
        //   }
        // }

        return {
          $project: {
            ...commonFields,
            ...projectFields
          }
        }
      }
     
      const result = await model
        .aggregate([
          {
            $facet: {
              totalCount: [
                { $match: matchConditions },
                { $count: 'count'}
              ],

              items: [
                { $match: matchConditions },
                { $sort: { createdAt: sortOrder } },
                { $skip: startIndex },
                { $limit: limit },
                ...generalLookupStage(model),
                generateProjectStage(model)
              ]
            }
          }
        ]);

      const totalItems = await model.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      const lastMonthItems = await model.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      })
      const stats = {
        totalItems,
        lastMonthItems
      }

      const count = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
      const results = result[0].items;

      const data = {
        count,
        startIndex,
        limit: limit,
        results,
        stats
      }

      res.paginatedResults = data;
      next(); 
    // } catch(err: any) {
    //   // console.log(err);
    //   return next(makeError(500, err.message));
    // }
  }
}

export default paginate