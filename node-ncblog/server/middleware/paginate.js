module.exports = (model) => {
  return async (req, res, next) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let perPage = parseInt(req.query.perPage)  || 10;
      let searchTerm = req.query.search;

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

        const result = await model
          .aggregate([
            {
              $facet: {
                totalCount: [
                  // query condition
                  { $match:
                    { $or: [
                      { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                      { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
                      ]
                    }
                  },
                  { $count: 'count'}
                ],

                items: [
                  { $match:
                    { $or: [
                      { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                      { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
                      ]
                    } },
                  { $sort: { createdAt: -1 } },
                  { $skip: startIndex },
                  { $limit: perPage }
                ]
              }
            }
          ]);
        
        const count = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const totalPages = Math.ceil(count / perPage);
        const results = result[0].items;

        prevPage = page >= 2 ? parseInt(page) - 1 : null;
        nextPage = parseInt(page) + 1;
        hasNextPage = nextPage <= totalPages;
  
        data = {
          // locals,
          count,
          current: page,
          prev: prevPage,
          next: hasNextPage ? nextPage : null,
          perPage: perPage,
          results
        }

      }
      else {
        // pagination
        count = await model.count();
        const startIndex = (page - 1) * perPage;
        const totalPages = Math.ceil(count / perPage);
  
        const results = await model
          .aggregate([{ $sort: { createdAt: -1 }}])
          .skip(startIndex)
          .limit(perPage)
          .exec();
        // posts = await Post.find().sort("-createdAt");
  
        prevPage = page >= 2 ? parseInt(page) - 1 : null;
        nextPage = parseInt(page) + 1;
        hasNextPage = nextPage <= totalPages;
  
        data = {
          // locals,
          count,
          current: page,
          prev: prevPage,
          next: hasNextPage ? nextPage : null,
          perPage: perPage,
          results
        }
      }

      // throw new Error('my error');
      res.paginatedResults = data;
      next(); 
      // res.send(data);
    } catch(err) {
      res.status(500).send({ message: err.message})
      // console.log(err);
    }
  }
}

      // console.log(`New print...`);

      // let latestPosts = parseInt(req.query.latestPosts);
      // console.log(`LatestPosts: ${latestPosts}`);

      // let perPageCount = parseInt(req.query.perPage);
      // console.log(`perPageCount: ${perPageCount}`);
      
      // if(latestPosts > 0) {
      //   perPage = latestPosts;
      // } else {
      //   if(perPageCount)
      //   {
      //     perPage = perPageCount;
      //   } else {
      //     perPage = 5;
      //   }
      // }
      // console.log(`perPage: ${perPage}`);