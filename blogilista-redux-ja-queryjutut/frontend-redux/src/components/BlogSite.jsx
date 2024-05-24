import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";

const BlogSite = ({ handleLike, handleDelete, handleComment }) => {
  const [comment, setComment] = useState("");
  const blogs = useSelector((state) => {
    const blogs = state.blogs;
    return blogs;
  });

  const currUser = useSelector((state) => state.currUser);

  const id = useParams().id;
  const blog = blogs.find((n) => n.id === id);
  if (!blog) return null;

  let visible = false;
  if (blog.user.username === currUser.username) {
    visible = true;
  }
  const hide = { display: visible ? "" : "none" };

  return (
    <div
      style={{
        padding: "1rem",
        border: "solid black 1px",
      }}
    >
      <Table>
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
              {blog.likes}
              <Button onClick={() => handleLike(blog)}>like</Button>
            </td>
          </tr>
          <tr>
            <th>Created by:</th>
            <td>{blog.user.username}</td>
          </tr>
        </tbody>
      </Table>

      <Button
        data-testid="deleteBlog"
        style={hide}
        onClick={() => handleDelete(blog)}
      >
        delete
      </Button>
      <div>
        <b>Comments:</b>
        <Form onSubmit={(e) => handleComment(e, blog, comment)}>
          <Form.Group>
            <Form.Control
              data-testid="comment"
              type="text"
              name="Comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </Form.Group>
          <Button type="submit">add comment</Button>
        </Form>
        <Table>
          <tbody>
            {blog.comments.length === 0 && <p>no comments yet</p>}

            {blog.comments.length > 0 &&
              blog.comments.map((c) => (
                <tr
                  key={c}
                  style={{
                    padding: "2px",
                  }}
                >
                  <td>{c}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BlogSite;
