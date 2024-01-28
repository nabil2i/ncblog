import Post, { PostFormData } from "../entities/Post";
import APIClient from "./api-client";

export default new APIClient<Post, PostFormData>('/me/posts');
