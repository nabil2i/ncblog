import AuthorModel from "./author";
import BookModel from "./book";
import CategoryModel from "./category";
import CommentModel from "./comment";
import PostModel from "./post";
import UserModel from "./user";

export type CustomModel = typeof AuthorModel
                | typeof CommentModel 
                | typeof UserModel
                | typeof PostModel
                | typeof CategoryModel
                | typeof CommentModel
                | typeof BookModel ;
