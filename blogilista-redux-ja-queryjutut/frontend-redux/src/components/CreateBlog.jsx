import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({
  setNotification,
  user,
  fetchBlogs,
  // handleCreateBlog,
  // title,
  // setTitle,
  // author,
  // setAuthor,
  // url,
  // setUrl,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      setNotification({
        message: `New blog ${newBlog.title} created`,
        type: "notification",
      });
      fetchBlogs();
    } catch (exception) {
      setNotification({ message: "Could not create new blog", type: "error" });
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
