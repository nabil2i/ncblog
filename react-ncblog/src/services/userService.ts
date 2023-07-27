import User from "../entities/User";
import APIClient from "./api-client";

export default new APIClient<User>('/users');

