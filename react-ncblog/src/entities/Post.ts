import { EntityId } from "@reduxjs/toolkit";

export default interface Post {
  // id: string | number;
  // id: string | number;
  id: EntityId;
  _id: string;
  title: string;
  slug: string;
  body: string;
  img?: string;
  category?: string;
  tags?: string[];
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  user?: {
    _id: string;
    username?: string;
    firstname: string;
    lastname: string;
  }
  comments: PostComment[]
  commentCount?: number;
  replyCount?: number;
  totalComments?: number;
  totalCommentsCount?: number;
}
export interface PostData {
  // _id?: string;
  title: string;
  body: string;
  // tags?: string[];
  userId?: string;
}

export interface PostComment {
  createdAt: Date;
  _id: string;
  text: string;
  user: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    img?: string;
  }
  // isTopLevelComment: boolean;
  replies: PostComment[];
  numberOfLikes: number;
  likes: string[];
  parentComment?: string;

}

export interface PostFormData {
  title: string;
  body: string;
  userId?: string;
  img?: string;
  category?: string;
  tags?: string[];
}
