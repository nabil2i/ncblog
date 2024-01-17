export default interface Book {
  _id: string;
  title: string;
  about: string;
  author: {
    firstname: string;
    lastname: string;
  }
}
