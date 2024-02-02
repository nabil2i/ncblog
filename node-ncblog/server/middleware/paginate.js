import mongoose from "mongoose";
import { makeError } from "../utils/responses.js";

const paginate = (model) => {
  return async (req, res, next) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let perPage = parseInt(req.query.perPage)  || 10;
      let searchTerm = req.query.search;
      let authorId = req.query.authorId;
      let postId = req.query.postId;
      let sortOrder = req.query.order === 'asc' ? 1 : -1;
      let category = req.query.category;
      let slug = req.query.slug;

      const startIndex = (page - 1) * perPage;
      const matchConditions = {};
  
      if (searchTerm) {
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        // console.log(searchTerm)
        matchConditions.$or = [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
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
                { $sort: { updatedAt: sortOrder } },
                { $skip: startIndex },
                { $limit: perPage },
                { $lookup: {
                  from: 'users',
                  localField: 'user',
                  foreignField: '_id',
                  as: 'user',
                },
              },
              { $unwind: {
                  path: '$user',
                  preserveNullAndEmptyArrays: true
                },
              },
              { $lookup: {
                from: 'authors',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
              },
          },
            { $unwind: {
                path: '$author',
                preserveNullAndEmptyArrays: true,
              },
            },
            { $project: {
                _id: 1,
                title: 1,
                body: 1,
                createdAt: 1,
                updatedAt: 1,
                user: {
                  _id: '$user._id',
                  firstname: '$user.firstname',
                  lastname: '$user.lastname',
                },
                comments: 1,
                category: 1,
                slug:1,
                tags: 1,
                likes: 1,
                img: 1,
              }
            },
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
      const totalPages = Math.ceil(count / perPage);
      const results = result[0].items;

      const prevPage = page >= 2 ? parseInt(page) - 1 : null;
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= totalPages;

      const data = {
        count,
        current: page,
        prev: prevPage,
        next: hasNextPage ? nextPage : null,
        perPage: perPage,
        results,
        stats
      }

      res.paginatedResults = data;
      next(); 
    } catch(err) {
      // console.log(err);
      return next(makeError(500, err.message));
    }
  }
}

export default paginate
