import { EntityId } from "@reduxjs/toolkit";

export default interface Post {
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
  deletedAt?: Date;
  updatedAt?: Date;
  hasLiked?: boolean;
  postAuthorId?: {
    _id: string;
    username?: string;
    firstname: string;
    lastname: string;
  }
  comments: PostComment[]
  commentCount?: number;
  replyCount?: number;
  likeCount?: number;
  status?: 'draft' | 'published';
  deletingStatus?: 'active' | 'deleted' | 'archived';
  currentDraftId: string;
}
export interface PostData {
  // _id?: string;
  title?: string;
  body?: string;
  // tags?: string[];
  postAuthorId?: string;
  slug?: string;
  img?: string;
  category?: string;
  tags?: string[];
}

export interface PostComment {
  _id: string;
  text: string;
  postId: string;
  userId: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    img?: string;
  }
  replies: PostComment[];
  replyCount: number;
  likeCount: number;
  topParentCommentId: string;
  realParentCommentId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface PostFormData {
  title: string;
  body: string;
  postAuthorId?: string;
  img?: string;
  category?: string;
  tags?: string[];
  status?: string;
}

// export interface LikePost {
//   postId: string;
//   likeCount: number;
// }
export interface LikePostForm {
  postAuthorId: string;
}

export interface PostLikeStatus {
  postId: string;
  hasLiked: boolean;
  likeCount: number;
}
