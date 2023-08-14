import LoginData from "../entities/LoginData";
import User from "../entities/User";
import APIClient from "./api-client";

export default new APIClient<User, LoginData>('/auth');
