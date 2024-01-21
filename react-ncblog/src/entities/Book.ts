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
  }
}
