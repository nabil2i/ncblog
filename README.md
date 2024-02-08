
# NC Blog
This project is a fullstack javascript web application  using node.js with express on the backend, and react.js on the frontend. It's a blog that proposes posts for readers. Editors on the website can add blog posts, edit them, delete them. Admins can manage resources of the blog.

The project system design and diagram document is available (here)[https://docs.google.com/document/d/1-fEuNqwnWiB2hgJXylv1zFOacpQmkdY3-5EWUqnXWZs/edit?usp=sharing] alongside the (diagrams and visualizations)[https://drive.google.com/file/d/1xcPKr6_uCNjg9tE7gUy0e6xXvpc1KtIS/view?usp=sharing]. The backend is deployed on render and the frontend is deployed on vercel.
Here is the live website link: (https://nabilconveys.vercel.app)[https://nabilconveys.vercel.app]

## Installation
This is how you can run the app on your local machine
* Clone the repository
```bash
git clone https://github.com/nabil2i/ncblog.git
```

* In the ncblog folder, install the package dependencies:

```bash
npm install
```

* In the react-ncblog folder, install the frontend packages:

```bash
npm install
```

* In the node-ncblog folder, install the backend packages:

```bash
npm install
```


* In the react-ncblog and node-ncblog folders, create a `.env` file and supply the values for the environment variables based on the `example.env` files

* Install mongodb on your local machine and get a mongodb connection URI that you will supply to the .env file in node-ncblog folder:


* In the main ncblog folder, launch both frontend and backend apps. By default the backend server should on `http://127.0.0.1:5000` and the frontend should be live on `http://127.0.0.1:5173`
```bash
npm run dev 
```
