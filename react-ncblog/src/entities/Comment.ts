export default interface Comment {
  _id: string;
  text: string;
  likes: string[];
  numberOfLikes: number;
}

export interface CommentForm {
  userId: string;
  text: string;
  parentCommentId?: string;
}
