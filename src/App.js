import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    coding: false,
    music: false,
    sports: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setInterests((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    console.log("form has been submitted");
  }

  const selectedInterests = Object.entries(interests)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <main>
      <h1>Hi, I'm Shaun</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Newsletter Signup</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name: 
          <input
            type="text"
            aria-label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email: 
          <input
            type="email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <div>
          <legend>Selet your interests</legend>

          <label>
            <input
              type="checkbox"
              name="coding"
              checked={interests.coding}
              onChange={handleCheckboxChange}
            />
            Coding
          </label>

          <label>
            <input
              type="checkbox"
              name="music"
              checked={interests.music}
              onChange={handleCheckboxChange}
            />
            Music
          </label>

          <label>
            <input
              type="checkbox"
              name="sports"
              checked={interests.sports}
              onChange={handleCheckboxChange}
            />
            Sports
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

    {submitted && (
      <div>
        <h3>Thank you for signing up, {name}!</h3>
        <p>We will reach you at: {email}</p>

        {selectedInterests.length > 0 && (
          <p>Your interests: {selectedInterests.join(", ")}</p>
        )}
      </div>
    )}

    </main>
  );
}

export default App;
