import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NotifContext from "./NotifContext";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [notif, notifDispatch] = useContext(NotifContext);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  // const result = useQuery({
  //   queryKey: ["blogs"],
  //   queryFn: blogService.getAll(user.token),
  // });

  const fetchBlogs = async () => {
    const blogList = await blogService.getAll(user.token);
    blogList.sort((a, b) => {
      return b.likes - a.likes;
    });
    setBlogs(blogList);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      // setUsername("");
      // setPassword("");

      notifDispatch({
        type: "NOTE",
        payload: { message: `Welcome, ${user.username}`, type: "notif" },
      });
    } catch (exception) {
      notifDispatch({
        type: "NOTE",
        payload: { message: "Wrong credentials", type: "error" },
      });
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
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
    // const newBlogs = await blogService.getAll(user.token);
    // setBlogs(newBlogs);
  };

  const handleDelete = async (blog) => {
    if (
      blog.user.username === user.username &&
      window.confirm(`Do you want to delete blog ${blog.title}?`)
    ) {
      try {
        const deletedBlog = await blogService.deleteBlog(blog.id, user.token);

        notifDispatch({
          type: "NOTE",
          payload: {
            message: `Blog ${deletedBlog} is removed`,
            type: "notif",
          },
        });
      } catch (exception) {
        notifDispatch({
          type: "NOTE",
          payload: {
            message: `Could not remove blog`,
            type: "error",
          },
        });
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
            <CreateBlog user={user} fetchBlogs={fetchBlogs} />
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
Muuta notifikaation tilanhallinta
tapahtumaan käyttäen useReducer-hookia ja contextia. DONE

7.11
Siirrä blogien tietojen hallinnointi tapahtumaan
React Query ‑kirjastoa hyväksikäyttäen.
Tässä tehtävässä riittää, että sovellus
näyttää olemassa olevat blogit, ja että uuden blogin luominen onnistuu.

Kirjautumisen ja uuden blogin luomisen lomakkeiden tilaa
kannattaa hallita edelleen Reactin tilan avulla.

7.12
Blogien "liketys" ja poisto toimimaan

7.13
kirjautuneen käyttäjän tietojen hallinnointi
useReducer-hookin ja contextin avulla.
*/
