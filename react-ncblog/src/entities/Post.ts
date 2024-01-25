import { EntityId } from "@reduxjs/toolkit";

export default interface Post {
  // id: string | number;
  // id: string | number;
  id: EntityId;
  _id: string;
  title: string;
  body: string;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  user?: {
    _id: string;
    firstname: string;
    lastname: string;
  }
  comments: PostComment[]
}
export interface PostData {
  // _id?: string;
  title: string;
  body: string;
  // tags?: string[];
  // userId: string;
}

export interface PostComment {
  createdAt: Date;
  _id: string;
  text: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    img?: string;
  }
  replies: PostComment[];
}
