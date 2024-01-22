
# NC Blog
This project is a fullstack javascript web application  using node.js with express on the backend, and react.js on the frontend. It's a blog that proposes posts for reader. Editors on the website can add blog post, edit them, delete theem. Admins can manage resources on the website( the frontend side is still in process).

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

* In the node-ncblog folder, install the frontend packages:

```bash
npm install
```


* In the react-ncblog and node-ncblog folders, create a `.env` file and supply the values for the environment variables based on the `example.env` files

* Install mongodb on your local machine and get a mongodb connection URI that you will supply to the .env file in node-ncblog folder:


* In the main ncblog folder, launch both frontend and backend apps. By default the backend server should on `http://127.0.0.1:5000` and the frontend should be live on `http://127.0.0.1:5173`
```bash
npm run dev 
```
