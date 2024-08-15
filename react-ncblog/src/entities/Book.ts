export default interface Book {
  _id: string;
  title: string;
  about: string;
  link?: string;
  author: {
    firstname: string;
    lastname: string;
    bio?: string;
    img?: string;
  };
  publisher?: string;
  publicationDate?: Date;
  language?: string;
  numberOfPages: number;
  size?: number;
  dimensions?: string;
}
