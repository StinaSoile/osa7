import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogList, fetchAndSetBlogs } from "./reducers/blogReducer";
import { login, logout } from "./reducers/userReducer";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(login(user));
    }
  }, []);

  const fetchBlogs = async () => {
    dispatch(fetchAndSetBlogs(user));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(login(user));
      setUsername("");
      setPassword("");

      await dispatch(setNotification(`Welcome, ${user.username}`, "notif"));
    } catch (exception) {
      await dispatch(setNotification("Wrong credentials", "error"));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout());
  };

  const handleLike = async (blog) => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    await blogService.likeBlog(blog.id, likedBlog, user.token);
    fetchBlogs();
  };

  const handleDelete = async (blog) => {
    if (
      blog.user.username === user.username &&
      window.confirm(`Do you want to delete blog ${blog.title}?`)
    ) {
      try {
        const deletedBlog = await blogService.deleteBlog(blog.id, user.token);
        await dispatch(
          setNotification(`Blog ${deletedBlog} is removed`, "notif")
        );
      } catch (exception) {
        await dispatch(setNotification(`Could not remove blog`, "error"));
      }
      fetchBlogs();
    }
  };

  return (
    <div>
      <Notification />
      {!user && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <>
          <Logout handleLogout={handleLogout} username={user.username} />
          <Togglable buttonLabel="new blog">
            <CreateBlog
              // blogs={blogs}
              // setBlogs={setBlogs}
              user={user}
              fetchBlogs={fetchBlogs}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                padding: "2px",
              }}
            >
              <Blog
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;

/*
7.10
Siirry käyttämään React-komponenttien tilan sijaan
Reduxia sovelluksen tilan hallintaan.
Muuta tässä tehtävässä notifikaatio käyttämään Reduxia.
DONE

7.11
Siirrä blogien tietojen talletus Reduxiin.
Tässä tehtävässä riittää, että sovellus näyttää olemassa olevat blogit
ja että uuden blogin luominen onnistuu.

Kirjautumisen ja uuden blogin luomisen lomakkeiden tilaa
kannattaa hallita edelleen Reactin tilan avulla.
DONE

7.12
Laajenna ratkaisua siten, että blogien "liketys" ja poisto toimivat. DONE

7.13
Siirrä myös kirjautuneen käyttäjän tietojen talletus Reduxiin. DONe
*/
