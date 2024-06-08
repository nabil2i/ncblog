import AuthorModel from "./author.ts";
import BookModel from "./book.ts";
import CategoryModel from "./category.ts";
import CommentModel from "./comment.ts";
import PostModel from "./post.ts";
import UserModel from "./user.ts";

export type CustomModel = typeof AuthorModel
                | typeof CommentModel 
                | typeof UserModel
                | typeof PostModel
                | typeof CategoryModel
                | typeof CommentModel
                | typeof BookModel ;
