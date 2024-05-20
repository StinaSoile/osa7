import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [expand, setExpand] = useState(false);
  let visible = false;
  if (blog.user.username === user.username) {
    visible = true;
  }
  const hide = { display: visible ? "" : "none" };

  const creator = blog.user.username;
  const handleExpand = () => {
    setExpand(!expand);
  };

  if (expand === false) {
    return (
      <div className="blog">
        <div>
          {blog.title} {blog.author}
        </div>
        <button onClick={handleExpand}>view</button>
      </div>
    );
  }
  if (expand === true) {
    return (
      <div
        style={{
          padding: "1rem",
          border: "solid black 1px",
          backgroundColor: "pink",
        }}
      >
        <table>
          <tbody>
            <tr>
              <th>Title:</th>
              <td>{blog.title}</td>
            </tr>
            <tr>
              <th>Author:</th>
              <td>{blog.author}</td>
            </tr>
            <tr>
              <th>url:</th>
              <td>{blog.url}</td>
            </tr>
            <tr>
              <th>Likes:</th>
              <td>
                {blog.likes}{" "}
                <button onClick={() => handleLike(blog)}>like</button>
              </td>
            </tr>
            <tr>
              <th>Created by:</th>
              <td>{creator}</td>
            </tr>
          </tbody>
        </table>
        <button data-testid="hideBlog" onClick={handleExpand}>
          hide
        </button>

        <button
          data-testid="deleteBlog"
          style={hide}
          onClick={() => handleDelete(blog)}
        >
          delete
        </button>
      </div>
    );
  }
};

export default Blog;
