module.exports = (model) => {
  return async (req, res, next) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let perPage = parseInt(req.query.perPage) || 3;

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
  
        results = await model
          .find({ 
            // do query 
            $or: [
              { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
              { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
          })
          .sort("-createdAt");
  
          count = await model
          .find({ 
            // do query 
            $or: [
              { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
              { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
          })
          .count();
  
        data = {
          // locals,
          count,
          current: page,
          prev: prevPage,
          next: nextPage,
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
      res.paginatedResults = data
      next(); 
      // res.send(data);
    } catch(err) {
      res.status(500).send({ message: err.message})
      // console.log(err);
    }
  }
}