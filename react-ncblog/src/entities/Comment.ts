import { EntityId } from "@reduxjs/toolkit";

export default interface Comment {
  id: EntityId;
  _id: string;
  text: string;
  likes: string[];
  numberOfLikes: number;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
  post: string;
  user: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
  }
}
export interface CommentEntity {
  id: EntityId;
  _id: string;
  text: string;
  likes: string[];
  numberOfLikes: number;
  createdAt: Date;
  updatedAt: Date;
  post: string;
  user: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
  }
}

export interface CommentForm {
  userId?: string;
  text: string;
  parentCommentId?: string;
  userRepliedTo?: string;
}
