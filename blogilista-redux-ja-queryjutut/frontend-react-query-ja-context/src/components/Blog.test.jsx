import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

/* 5.13:
blogin näyttävä komponentti renderöi blogin titlen ja authorin,
mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.*/
test("renders right content when nothing clicked", () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 5,
    user: {
      username: "Juppu",
      id: "75657657657",
    },
  };
  const user = {
    username: "Soikkeli",
    token: "token",
  };
  const handleLike = () => {
    console.log("like");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  render(
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      user={user}
    />
  );
  const element = screen.getByText("Title Author");
  const element2 = screen.queryByText(/url/);
  const element3 = screen.queryByText(/likes/);
  screen.getByText("view");

  screen.debug();
  expect(element2).toBeNull();
  expect(element3).toBeNull();
});
/*5.14:
myös url, likejen määrä ja käyttäjä näytetään,
kun blogin kaikki tiedot näyttävää nappia on painettu.*/
test("renders right content when view- and hide-button clicked", async () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 5,
    user: {
      username: "Juppu",
      id: "75657657657",
    },
  };
  const user = {
    username: "Soikkeli",
    token: "token",
  };
  const handleLike = () => {
    console.log("like");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  render(
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      user={user}
    />
  );
  const button = screen.getByText("view");

  const person = userEvent.setup();

  await person.click(button);

  screen.getByText("Title");
  screen.getByText("Author");
  screen.getByText("url");
  screen.getByText("5");
  screen.getByText("Juppu");
  const button2 = screen.getByText("hide");
  await person.click(button2);
  screen.getByText("Title Author");
  const element2 = screen.queryByText(/url/);
  const element3 = screen.queryByText(/likes/);
  screen.getByText("view");

  expect(element2).toBeNull();
  expect(element3).toBeNull();
});

/*5.15:
jos komponentin like-nappia painetaan kahdesti,
komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan
kaksi kertaa.*/
test("if like twice, call handler twice", async () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 5,
    user: {
      username: "Juppu",
      id: "75657657657",
    },
  };
  const user = {
    username: "Soikkeli",
    token: "token",
  };

  const mockHandler = vi.fn();

  const handleDelete = () => {
    console.log("delete");
  };

  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleDelete={handleDelete}
      user={user}
    />
  );
  const button = screen.getByText("view");

  const person = userEvent.setup();

  await person.click(button);

  const likeButton = screen.getByText("like");
  await person.click(likeButton);
  await person.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
