
import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`
      );

      if (!response.ok) {
        throw new Error("GitHub user not found!");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>GitHub Finder</h1>
        <p className="subtitle">
          Discover GitHub developers around the world.
        </p>

        <form onSubmit={searchUser} className="search-form">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading && <p className="loading">Fetching profile...</p>}

        {user && (
          <div className="profile-card">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="avatar"
            />

            <h2>{user.name || user.login}</h2>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="username"
            >
              @{user.login}
            </a>

            <p className="bio">
              {user.bio || "No bio available."}
            </p>

            <div className="location">
              📍 {user.location || "Location not available"}
            </div>

            <div className="stats">
              <div>
                <h3>{user.public_repos}</h3>
                <p>Repositories</p>
              </div>

              <div>
                <h3>{user.followers}</h3>
                <p>Followers</p>
              </div>

              <div>
                <h3>{user.following}</h3>
                <p>Following</p>
              </div>
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="profile-btn"
            >
              View GitHub Profile →
            </a>
          </div>
        )}

        <footer>
          Built with React & GitHub API
        </footer>
      </div>
    </div>
  );
}

export default App;
