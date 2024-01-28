import User, { LoginData } from "../entities/User";
import APIClient from "./api-client";

export default new APIClient<User, LoginData>('/auth');
