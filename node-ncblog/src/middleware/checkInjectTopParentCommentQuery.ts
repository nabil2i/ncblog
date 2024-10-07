import { NextFunction, Request, Response } from "express-serve-static-core";

// Middleware to check or inject the top parent comment in the request query
const checkInjectTopParentCommentQuery = async (req: Request, res: Response, next: NextFunction) => {
  let { topParentCommentId } = req.query;

    // const comment = await CommentModel.findById(topParentCommentId).lean();

    if (!topParentCommentId || topParentCommentId === undefined) {
      topParentCommentId = req.params.cid;

      req.query.topParentCommentId = topParentCommentId;
    }

    next();
};

export default checkInjectTopParentCommentQuery;