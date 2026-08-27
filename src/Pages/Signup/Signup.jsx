import SignIllustration from "../../assets/intro_pages/signup.png";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    setError("");

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Check existing user

      const existingResponse = await fetch(
        `http://localhost:6500/users?email=${encodeURIComponent(
          user.email
        )}`
      );

      const existingUsers =
        await existingResponse.json();

      if (existingUsers.length > 0) {
        setError("Email already exists.");
        return;
      }

      // Create user

      const response = await fetch(
        "http://localhost:6500/users",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {
      console.error(error);

      setError(
        "Server error. Please start JSON Server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sign-up">

      <div className="sign-up-page">

        <div className="sign-up-image">

          <h2>
            Start to manage your
            <span>MONEY</span>
            <br />
            from <span>NOW</span>
          </h2>

          <img
            src={SignIllustration}
            alt="Expense management"
          />

        </div>

        <div className="sign-up-content">

          <div className="sign-up-content-header">
            <h1>Create Account</h1>
          </div>

          <form
            className="form"
            onSubmit={handleSignup}
          >

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter the name"
            />

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
            />

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter the password"
            />

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Enter confirm password"
            />

            <div className="submit-button">

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Account"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Signup;