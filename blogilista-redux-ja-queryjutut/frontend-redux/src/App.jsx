import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

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
      setNotification({
        message: `Welcome, ${user.username}`,
        type: "notification",
      });
    } catch (exception) {
      setNotification({ message: "Wrong credentials", type: "error" });
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
        setNotification({
          message: `Blog ${deletedBlog} is removed`,
          type: "notification",
        });
      } catch (exception) {
        setNotification({
          message: `Could not remove blog`,
          type: "error",
        });
      }
      fetchBlogs();
    }
  };

  return (
    <div>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
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
              setNotification={setNotification}
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

7.11


Tämä ja seuraava kaksi osaa ovat kohtuullisen työläitä, mutta erittäin opettavaisia.

Siirrä blogien tietojen talletus Reduxiin.
Tässä tehtävässä riittää, että sovellus näyttää olemassa olevat blogit
ja että uuden blogin luominen onnistuu.

Kirjautumisen ja uuden blogin luomisen lomakkeiden tilaa
kannattaa hallita edelleen Reactin tilan avulla.

7.12
Laajenna ratkaisua siten, että blogien "liketys" ja poisto toimivat.

7.13
Siirrä myös kirjautuneen käyttäjän tietojen talletus Reduxiin.
*/
