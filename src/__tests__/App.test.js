import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveAttribute("type", "text");

  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes).toHaveLength(3);

  screen.getByRole("checkbox", { name: /coding/i });
  screen.getByRole("checkbox", { name: /music/i });
  screen.getByRole("checkbox", { name: /sports/i });
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const coding = screen.getByRole("checkbox", { name: /coding/i });
  const music = screen.getByRole("checkbox", { name: /music/i });
  const sports = screen.getByRole("checkbox", { name: /sports/i });

  expect(coding).not.toBeChecked();
  expect(music).not.toBeChecked();
  expect(sports).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  const user = userEvent.setup();
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await user.type(nameInput, "Shaun");
  await user.type(emailInput, "shaun@example.com");

  expect(nameInput).toHaveValue("Shaun");
  expect(emailInput).toHaveValue("shaun@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  const user = userEvent.setup();
  render(<App />);

  const coding = screen.getByRole("checkbox", { name: /coding/i });

  expect(coding).not.toBeChecked();

  await user.click(coding);
  expect(coding).toBeChecked();

  await user.click(coding);
  expect(coding).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  const user = userEvent.setup();
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const coding = screen.getByRole("checkbox", { name: /coding/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await user.type(nameInput, "Shaun");
  await user.type(emailInput, "shaun@example.com");
  await user.click(coding);
  await user.click(submitButton);

  // Personalized message
  expect(
    screen.getByText(/thank you for signing up, shaun!/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/we will reach you at: shaun@example.com/i)
  ).toBeInTheDocument();
});
