import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";

const CreateBlog = ({ user, fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      await blogService.createBlog(newBlog, user.token);
      setTitle("");
      setAuthor("");
      setUrl("");

      await dispatch(
        setNotification(`New blog ${newBlog.title} created`, "notif")
      );
      fetchBlogs();
    } catch (exception) {
      await dispatch(setNotification("Could not create new blog", "error"));
    }
  };
  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            placeholder="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            placeholder="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="text"
            placeholder="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button data-testid="createbutton" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
