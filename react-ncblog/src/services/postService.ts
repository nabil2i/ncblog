import Post from "../entities/Post";
import APIClient from "./api-client";

export default new APIClient<Post>('/posts');
