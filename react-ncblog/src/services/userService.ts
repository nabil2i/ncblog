import User, { UserForm} from "../entities/User";
import APIClient from "./api-client";

export default new APIClient<User, UserForm>('/users');

