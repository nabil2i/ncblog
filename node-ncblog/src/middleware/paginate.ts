import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CustomModel } from "../models/model.js";
import { makeError } from "../utils/responses.js";

interface CustomQuery {
  page: string;
  limit: string;
  search?: string;
  authorId?: string;
  postId?: string;
  order?: string;
  category?: string;
  slug?: string;
}

interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
  query: CustomQuery & ParsedQs;
}
interface CustomResponse extends Response {
  paginatedResults?: any;
}

interface MatchCondition {
  $or?: { [key: string]: { $regex: RegExp } } [] ;
  user?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  slug?: string;
  category?: string;
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
    firstname?: string;
    lastname?: string;
  };
}

const paginate = (model: CustomModel) => {
  return async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      let searchTerm = req.query.search;
      let authorId = req.query.authorId;
      let postId = req.query.postId;
      let sortOrder: 1 | -1 = req.query.order === 'asc' ? 1 : -1;
      let category = req.query.category;
      let slug = req.query.slug;
  
      const startIndex = (page - 1) * limit;
      const matchConditions: MatchCondition = {};
  
      if (searchTerm && typeof searchTerm === 'string') {
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        // console.log(searchTerm)
        matchConditions.$or = [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
          // { title: { $regex: new RegExp(searchTerm, 'i') } },
          // { body: { $regex: new RegExp(searchTerm, 'i') } },
          // { tags: { $regex: new RegExp(searchTerm, 'i') } },
          // { category: { $regex: new RegExp(searchTerm, 'i') } },
          // { user: { $regex: new RegExp(searchTerm, 'i') } },
        ]
      }

      if (authorId) {
        matchConditions.user = new mongoose.Types.ObjectId(authorId);
        // console.log(matchConditions.user);
      }

      if (postId) {
        matchConditions._id = new mongoose.Types.ObjectId(postId)
      }

      if (slug) {
        matchConditions.slug = slug
      }

      if (category) {
        matchConditions.category = category
      }

      // console.log(model)
      const fields = Object.keys(model.schema.paths);
      const modelName = model.modelName;
      // console.log('Fields in UserModel:', fields);
      // console.log('Modelname of UserModel:', modelName);
      

      const generalLookupStage = (model: CustomModel) => {
        const lookupStages = [];
        
        if (fields.includes('user')) {
          lookupStages.push({
            $lookup: {
              from: 'users',
              localField: 'user',
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

        if (fields.includes('author')) {
          lookupStages.push({
            $lookup: {
              from: 'authors',
              localField: 'author',
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
          projectFields.user = 1,
          projectFields.likes = 1,
          projectFields.img = 1,
          // projectFields.comments = 1,
          projectFields.numberOfLikes = 1,
          projectFields.totalCommentsCount = 1,
          projectFields.category = 1
        } else if (modelName === "Category") {
          projectFields.name = 1
        } else if (modelName === "Comment") {
          projectFields.text = 1,
          projectFields.post = 1,
          projectFields.likes = 1,
          projectFields.numberOfLikes = 1
        } else if (modelName === "Genre") {
          projectFields.name = 1
        } else if (modelName === "Comment") {
          projectFields.text = 1,
          projectFields.user = 1,
          projectFields.parent = 1,
          projectFields.replies = 1
        } else if (modelName === "Genre") {
          projectFields.name = 1
        } else if (modelName === "User") {
          projectFields.slug = 1,
          projectFields.username = 1,
          projectFields.email = 1,
          projectFields.roles = 1,
          projectFields.isActive = 1,
          projectFields.isAdmin = 1,
          projectFields.firstname = 1,
          projectFields.lastname = 1,
          projectFields.img = 1
        } else if (modelName === "Book") {
          projectFields.title = 1,
          projectFields.about = 1,
          projectFields.genre = 1,
          projectFields.img = 1,
          projectFields.author = 1,
          projectFields.publishedYear = 1,
          projectFields.isbn = 1,
          projectFields.link = 1
        }
        
        if (fields.includes('user')){
          projectFields.user = {
            _id: '$user._id',
            firstname: '$user.firstname',
            lastname: '$user.lastname',
          }
        }
        if (fields.includes('author')){
          projectFields.author = {
            _id: '$author._id',
            firstname: '$author.firstname',
            lastname: '$author.lastname',
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
      // console.log(generateProjectStage(model));
      // console.log(generalLookupStage(model));
     
      
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
    } catch(err: any) {
      console.log(err);
      // return;
      return next(makeError(500, err.message));
    }
  }
}

export default paginate