import { PostFormData } from "../components/admin/posts/PostForm";
import Post from "../entities/Post";
import APIClient from "./api-client";

export default new APIClient<Post, PostFormData>('/me/posts');
