import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("when creates blog, calls fetchBlog", async () => {
  const user = userEvent.setup();
  const fetchHandler = vi.fn();
  const setNotificationHandler = vi.fn();

  render(
    <CreateBlog
      setNotification={setNotificationHandler}
      user={user}
      fetchBlogs={fetchHandler}
    />
  );
  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const submit = screen.getByText("create");
  await user.type(title, "TitleOfBlog");
  await user.type(author, "auth");
  await user.type(url, "osoite.fi");
  await user.click(submit);

  expect(setNotificationHandler.mock.calls).toHaveLength(1);
  console.log(setNotificationHandler.mock.calls);
  expect(setNotificationHandler.mock.calls[0][0]).toStrictEqual({
    message: "Could not create new blog",
    type: "error",
  });
});
