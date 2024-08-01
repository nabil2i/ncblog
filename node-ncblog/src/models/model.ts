import AuthorModel from "./author.js";
import BookModel from "./book.js";
import CategoryModel from "./category.js";
import CommentModel from "./comment.js";
import PostModel from "./post.js";
import UserModel from "./user.js";

export type CustomModel = typeof AuthorModel
                | typeof CommentModel 
                | typeof UserModel
                | typeof PostModel
                | typeof CategoryModel
                | typeof CommentModel
                | typeof BookModel ;
