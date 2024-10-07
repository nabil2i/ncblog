import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CustomModel } from "../models/model.js";
import { makeError } from "../utils/error.js";

interface CustomQuery {
  page: string;
  limit: string;
  search?: string;
  authorId?: string;
  postAuthorId?: string;
  postId?: string;
  order?: string;
  category?: string;
  slug?: string;
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
  postAuthorId?: mongoose.Types.ObjectId;
  authorId?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  slug?: string;
  category?: string;
  topParentCommentId?: mongoose.Types.ObjectId;
}

// interface MatchCondition {
//   $or?: { title: { $regex: RegExp } } [] | { body: { $regex: RegExp } } [];
//   user?: mongoose.Types.ObjectId;
//   _id?: mongoose.Types.ObjectId;
//   slug?: string;
//   category?: string;
// }

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
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      let searchTerm = req.query.search;
      let sortOrder: 1 | -1 = req.query.order === 'asc' ? 1 : -1;
      
      let postAuthorId = req.query.postAuthorId;   
      let postId = req.query.postId;
      let category = req.query.category;
      let slug = req.query.slug;

      let authorId = req.query.authorId;

      let topParentCommentId = req.query.topParentCommentId;
  
      const startIndex = (page - 1) * limit;
      const matchConditions: MatchCondition = {};
  
      // Set up match conditions
      if (searchTerm && typeof searchTerm === 'string') {
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
        }
      }

      if (modelName === "Post") {
        if (postAuthorId) {
          matchConditions.postAuthorId = new mongoose.Types.ObjectId(postAuthorId);
        }
  
        if (slug) {
          matchConditions.slug = slug
        }
  
        if (category) {
          matchConditions.category = category
        }
      }
      
      if (modelName === "Comment") {
        if (topParentCommentId) {
          matchConditions.topParentCommentId = new mongoose.Types.ObjectId(topParentCommentId);
        }  
      }

      // Lookups to fill in referenced collections
      // References to lookup
      const generalLookupStage = (model: CustomModel) => {
        const lookupStages = [];
        
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

        // console.log("LookupStages: ", lookupStages);
        return lookupStages;
      }

      // Fields to supply
      const generateProjectStage = (model: CustomModel) => {
        // Fields to get in any case
        const commonFields = {
          _id: 1,
          createdAt: 1,
          updatedAt: 1,
        }

        // Finely tuned fields
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

        // console.log("ProjectFields: ", projectFields);

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
          },
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
      const totalPages = Math.ceil(count / limit);
      const results = result[0].items;

      const prevPage = page >= 2 ? page - 1 : null;
      const nextPage = page + 1;
      const hasNextPage = nextPage <= totalPages;

      const data = {
        count,
        current: page,
        prev: prevPage,
        next: hasNextPage ? nextPage : null,
        limit: limit,
        results,
        stats
      }

      res.paginatedResults = data;
      next(); 
    // } catch(err: any) {
    //   // console.log(err);
    //   // return;
    //   return next(makeError(500, err.message));
    // }
  }
}

export default paginate