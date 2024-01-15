export default interface Post {
  _id?: string;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
    _id: string;
    firstname: string;
    lastname: string;
  }
  comments: PostComment[]
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
