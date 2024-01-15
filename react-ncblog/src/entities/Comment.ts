export default interface Comment {
  _id: string;
  text: string;

}

export interface CommentForm {
  userId: string;
  text: string;
  parentCommentId?: string;
}
