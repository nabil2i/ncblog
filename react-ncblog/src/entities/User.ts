import { EntityId } from "@reduxjs/toolkit";

export default interface User {
  _id: string;
  id: EntityId;
  username?: string;
  firstname: string;
  lastname: string;
  email?: string;
  password?: string;
  password2?: string;
  accessToken?: string;
  isAuthenticated?: boolean;
  img?: string;
  roles?: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SimpleUser {
  _id: string;
  firstname: string;
  lastname: string;
  img?: string;
}

export interface UserForm {
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  password2?: string;
  img?: string;
}

export interface LoginData {
  username?: string;
  password?: string;
  token?: string;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  firstname: string;
  lastname: string;
}
