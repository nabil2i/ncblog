import AuthorModel from "./author.js";
import BookModel from "./book.js";
import CategoryModel from "./category.js";
import CommentModel from "./comment.js";
import GenreModel from "./genre.js";
import PermissionModel from "./permission.js";
import PostModel from "./post.js";
import RoleModel from "./role.js";
import UserModel from "./user.js";

export type CustomModel = typeof AuthorModel
| typeof UserModel
                | typeof CommentModel 
                | typeof RoleModel
                | typeof PermissionModel
                | typeof PostModel
                | typeof CategoryModel
                | typeof CommentModel
                | typeof AuthorModel 
                | typeof BookModel
                | typeof GenreModel;
