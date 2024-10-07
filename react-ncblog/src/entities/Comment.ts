import { EntityId } from "@reduxjs/toolkit";

export default interface Comment {
  id: EntityId;
  _id: string;
  text: string;
  postId: string;
  replyCount: number;
  likeCount: number;
  isDeleted: boolean;
  topParentCommentId: string;
  realParentCommentId: string;
  userRepliedToId: string;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
  post: string;
  userId: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    img?: string;
  }
}
export interface CommentEntity {
  id: EntityId;
  _id: string;
  text: string;
  likes: string[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  post: string;
  userId: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
  }
}

export interface CommentForm {
  userId?: string;
  text: string;
  topParentCommentId?: string | null;
  realParentCommentId?: string | null;
  userRepliedToId?: string;
}

export interface LikeComment {
  commentId: string;
  likeCount: number;
}

export interface CommentLikeStatus {
  commentId: string;
  hasLiked: boolean;
  likeCount: number;
}