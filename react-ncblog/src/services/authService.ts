import TokenObj from "../entities/TokenObj";
import APIClient from "./api-client";

export default new APIClient<TokenObj>('/auth');
