import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import LoginForm from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

const App = () => {
   const [blogs, setBlogs] = useState([]);
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState(null);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [url, setUrl] = useState("");
   const [message, setMessage] = useState("");
   const [styles, setStyles] = useState({
      fontSize: "16px",
      padding: "10px",
      margin: "20px",
      fontWeight: "bold",
      border: "3px  solid green",
      backgroundColor: "#ccc",
   });

   useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
   }, []);

   useEffect(() => {
      const userJson = window.localStorage.getItem("loggedInUser");
      if (userJson) {
         const userObject = JSON.parse(userJson);
         setUser(userObject);
         //  console.log("🚀 ~ useEffect ~ userObject:", userObject);
         blogService.setToken(userObject.token);
      }
   }, []);

   useEffect(() => {
      userService
         .getAllUsers()
         .then((users) => {
            setUsers(users);
         })
         .catch((error) => {
            displayNotification(error.response.data.error);
            setStyles({ ...styles, border: "3px solid red", color: "red" });
            console.log(
               "🚀 ~ userService.getAllUsers ~ error.message:",
               error.message,
            );
         });
   }, []);

   const handleLogin = async (e) => {
      e.preventDefault();

      try {
         const userData = await blogService.login({ username, password });
         setUser(userData);
         blogService.setToken(userData.token);
         window.localStorage.setItem(
            "loggedInUser",
            `${JSON.stringify(userData)}`,
         );
         setUsername("");
         setPassword("");
      } catch (error) {
         displayNotification(error.response.data.error);
         setStyles({ ...styles, border: "3px solid red", color: "red" });
         console.log(
            "🚀 ~ handleLogin ~ error.message:",
            error.response.data.error,
         );
      }
   };

   const handleLogout = () => {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
   };

   const displayNotification = (text) => {
      setMessage(text);
      setTimeout(() => {
         setMessage("");
      }, 3000);
   };

   const handleBlogCreate = async (e) => {
      e.preventDefault();

      try {
         const loggedInUser = users.find(
            (singleUser) => singleUser.username === user.username,
         );
         const newBlog = { title, author, url, user: loggedInUser.id };
         const blog = await blogService.createBlog(newBlog);
         //  console.log("🚀 ~ handleBlogCreate ~ blog:", blog);
         setBlogs([...blogs, newBlog]);
         displayNotification(
            `A new blog ${blog.title} added by ${blog.author}`,
         );
         setTitle("");
         setAuthor("");
         setUrl("");
      } catch (exception) {
         displayNotification(exception.response.data.error);
         setStyles({ ...styles, border: "3px solid red", color: "red" });
         console.log(
            "🚀 ~ handleBlogCreate ~ exception.message:",
            exception.response,
         );
      }
   };

   return (
      <div>
         <h2>blogs</h2>
         {message && (
            <Notification
               message={message}
               styles={styles}
            />
         )}
         {user === null ? (
            <LoginForm
               handleLogin={handleLogin}
               username={username}
               setUsername={setUsername}
               password={password}
               setPassword={setPassword}
            />
         ) : (
            <>
               <p style={{ margin: "20px", fontWeight: "bold" }}>
                  {user.name} logged in{" "}
                  <button onClick={handleLogout}>Logout</button>
               </p>
               <CreateBlog
                  handleBlogCreate={handleBlogCreate}
                  title={title}
                  setTitle={setTitle}
                  url={url}
                  setUrl={setUrl}
                  author={author}
                  setAuthor={setAuthor}
               />

               {blogs.map((blog) => (
                  <Blog
                     key={blog.id}
                     blog={blog}
                  />
               ))}
            </>
         )}
      </div>
   );
};

export default App;
