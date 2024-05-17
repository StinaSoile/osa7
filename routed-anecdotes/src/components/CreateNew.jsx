/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");
  const author = useField("string");
  const info = useField();
  const content = useField("string");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/anecdotes");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button type="submit">create</button>
        <button
          type="button"
          onClick={() => {
            content.onChange();
            author.onChange();
            info.onChange();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
