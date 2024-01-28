module.exports = (model) => {
  return async (req, res, next) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let perPage = parseInt(req.query.perPage)  || 20;
      let searchTerm = req.query.search;
      let authorId = req.query.authorId;

      let count = 0;
      let prevPage = null;
      let nextPage = null;
      let hasNextPage = false;
      let results = [];

      let data = {};
  
      if (searchTerm) {
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        // console.log(searchTerm)

        const startIndex = (page - 1) * perPage;

        const matchConditions = {
          $or: [
            { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
            { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
          ]
        };

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
                  { $sort: { createdAt: -1 } },
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
                // { $project: {
                //     _id: 1,
                //     title: 1,
                //     body: 1,
                //     createdAt: 1,
                //     updatedAt: 1,
                //     user: {
                //       _id: '$user._id',
                //       firstname: '$user.firstname',
                //       lastname: '$user.lastname',
                //     },
                //     comments: 1,
                //   }
                // },
                ]
              }
            }
          ]);
        
        const count = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const totalPages = Math.ceil(count / perPage);
        results = result[0].items;

        prevPage = page >= 2 ? parseInt(page) - 1 : null;
        nextPage = parseInt(page) + 1;
        hasNextPage = nextPage <= totalPages;
  
        data = {
          count,
          current: page,
          prev: prevPage,
          next: hasNextPage ? nextPage : null,
          perPage: perPage,
          results
        }

      }

      else if (authorId) {const startIndex = (page - 1) * perPage;

        const matchConditions = {
          user: mongoose.Types.ObjectId(req.query.authorId)
        };

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
                  { $sort: { createdAt: -1 } },
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
                // { $project: {
                //     _id: 1,
                //     title: 1,
                //     body: 1,
                //     createdAt: 1,
                //     updatedAt: 1,
                //     user: {
                //       _id: '$user._id',
                //       firstname: '$user.firstname',
                //       lastname: '$user.lastname',
                //     },
                //     comments: 1,
                //   }
                // },
                ]
              }
            }
          ]);
        
        const count = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const totalPages = Math.ceil(count / perPage);
        results = result[0].items;

        prevPage = page >= 2 ? parseInt(page) - 1 : null;
        nextPage = parseInt(page) + 1;
        hasNextPage = nextPage <= totalPages;
  
        data = {
          count,
          current: page,
          prev: prevPage,
          next: hasNextPage ? nextPage : null,
          perPage: perPage,
          results
        }

      }
      else {
        count = await model.countDocuments();
        // count = await model.count();
        const startIndex = (page - 1) * perPage;
        const totalPages = Math.ceil(count / perPage);
  
        results = await model
          .aggregate([
            { $sort: { createdAt: -1 }},
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
                preserveNullAndEmptyArrays: true,
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
            // { $project: {
            //     _id: 1,
            //     title: 1,
            //     body: 1,
            //     createdAt: 1,
            //     updatedAt: 1,
            //     user: {
            //         _id: '$user._id',
            //         firstname: '$user.firstname',
            //         lastname: '$user.lastname',
            //     },
            //     comments: 1,
            //   }
            // },
          ])
          .exec();
  
        prevPage = page >= 2 ? parseInt(page) - 1 : null;
        nextPage = parseInt(page) + 1;
        hasNextPage = nextPage <= totalPages;
  
        data = {
          count,
          current: page,
          prev: prevPage,
          next: hasNextPage ? nextPage : null,
          perPage: perPage,
          results
        }
      }

      res.paginatedResults = data;
      next(); 
    } catch(err) {
      // console.log(err);
      res.status(500).json({
        success: false,
        error: { code: 500,  message: err.message}
     })
    }
  }
}
