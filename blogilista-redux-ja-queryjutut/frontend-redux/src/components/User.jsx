import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => {
    const users = state.users;
    return users;
  });

  const id = useParams().id;
  const user = users.find((n) => n.id === id);
  if (!user) return null;

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
