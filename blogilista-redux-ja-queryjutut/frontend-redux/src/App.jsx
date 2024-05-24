import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Users from "./components/Users";
import User from "./components/User";
import BlogSite from "./components/BlogSite";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogList, fetchAndSetBlogs } from "./reducers/blogReducer";
import { fetchAndSetUsers } from "./reducers/usersReducer";
import { login, logout } from "./reducers/currUserReducer";
import { Table, Navbar, Container, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from "react-router-dom";
import users from "./services/users";
const App = () => {
  const padding = {
    padding: 5,
  };
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.currUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      fetchBlogs();
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(login(user));
    }
  }, []);

  const fetchUsers = async () => {
    dispatch(fetchAndSetUsers(user));
  };

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
      comments: blog.comments,
    };

    await blogService.changeBlog(blog.id, likedBlog, user.token);
    fetchBlogs();
  };

  const handleComment = async (e, blog, comment) => {
    await e.preventDefault();
    let newComments = [];
    if (!blog.comments || blog.comments.length === 0) {
      newComments = [comment];
    } else {
      newComments = [...blog.comments, comment];
    }
    const commentedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id,
      comments: newComments,
    };
    console.log(commentedBlog);
    try {
      await blogService.changeBlog(blog.id, commentedBlog, user.token);
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
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
    <div className="container">
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
        <Navbar>
          <Container>
            <Link to="/">blogs</Link>

            <Link to="/users">users</Link>

            <Logout handleLogout={handleLogout} username={user.username} />
          </Container>
        </Navbar>
      )}
      <Routes>
        <Route
          path="/"
          element={
            user && (
              <>
                <h2>blogs</h2>

                <Togglable buttonLabel="new blog">
                  <CreateBlog user={user} fetchBlogs={fetchBlogs} />
                </Togglable>

                <Table>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr
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
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )
          }
        />

        <Route path="/users" element={user && <Users />} />
        <Route path="/users/:id" element={user && <User />} />
        <Route
          path="/blogs/:id"
          element={
            user && (
              <BlogSite
                handleLike={handleLike}
                handleDelete={handleDelete}
                handleComment={handleComment}
              />
            )
          }
        />
      </Routes>
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





YHTEISET:
7.14
Tee sovellukseen näkymä, joka näyttää kaikkiin käyttäjiin liittyvät perustiedot. Kuva.
DONE

7.15
Tee sovellukseen yksittäisen käyttäjän näkymä, jolta selviää mm. käyttäjän lisäämät blogit.
Näkymään päästään klikkaamalla nimeä kaikkien käyttäjien näkymästä.

Huom: törmäät tätä tehtävää tehdessäsi lähes varmasti seuraavaan virheeseen:
"TypeError: cannot read property 'name" of undefined"

vika ilmenee jos uudelleenlataat sivun ollessasi yksittäisen käyttäjän sivulla.

Vian syynä on se, että jos mennään suoraan jonkin käyttäjän sivulle,
eivät käyttäjien tiedot ole vielä ehtineet palvelimelta React-sovellukseen.
Ongelman voi kiertää ehdollisella renderöinnillä, kuva.

DONE

7.16
Toteuta sovellukseen oma näkymä yksittäisille blogeille. Esim kuva.
Näkymään päästään klikkaamalla blogin nimeä kaikkien blogien näkymästä.

Tämän tehtävän jälkeen tehtävässä 5.6 toteutettua toiminnallisuutta ei enää tarvita,
eli kaikkien blogien näkymässä yksittäisten blogien detaljien
ei enää tarvitse avautua klikattaessa.
DONE

7.17 ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ MISSASIT TÄMÄN, PALAA TÄHÄN
Tee sovellukseen navigaatiomenu.

7.18
mahdollisuus blogien kommentointiin.
Kommentit ovat anonyymejä, eli ne eivät liity järjestelmän käyttäjiin.
Tässä tehtävässä riittää, että frontend osaa näyttää blogilla olevat backendin kautta lisätyt kommentit.
Sopiva rajapinta kommentin luomiseen on osoitteeseen api/blogs/:id/comments tapahtuva HTTP POST ‑pyyntö.
DONE

7.19
Laajenna sovellusta siten, että kommentointi onnistuu frontendista käsin. Kuva. DONE

7.20-21
Tee sovelluksesi ulkoasusta tyylikkäämpi jotain kurssilla esiteltyä tapaa käyttäen.
Jos käytät tyylien lisäämiseen noin tunnin aikaa, merkkaa myös tehtävä 21 tehdyksi.

7.22 lets push it
*/
