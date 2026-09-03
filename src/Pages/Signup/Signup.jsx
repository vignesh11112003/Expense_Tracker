import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import signupImage from "../../assets/intro_pages/signup.png";

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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !user.name.trim() ||
      !user.email.trim() ||
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

      // Get existing users
      const existingUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      // Check existing email
      const emailExists = existingUsers.some(
        (item) =>
          item.email.trim().toLowerCase() ===
          user.email.trim().toLowerCase()
      );

      if (emailExists) {
        setError("Email already exists.");
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: user.name.trim(),
        email: user.email.trim().toLowerCase(),
        password: user.password,
      };

      // Add new user
      const updatedUsers = [
        ...existingUsers,
        newUser,
      ];

      // Save users
      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      alert("Account created successfully!");

      // Navigate to login
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);

      setError(
        "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sign-up">

      <div className="sign-up-page">

        {/* ================= LEFT SIDE ================= */}

        <div className="sign-up-image">

          <h2>
            Join{" "}
            <span>Expense Tracker</span>{" "}
            Today
          </h2>

          <img
            src={signupImage}
            alt="Signup illustration"
          />

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="sign-up-content">

          <div className="sign-up-content-header">
            <h1>Sign Up</h1>
          </div>

          <form
            className="form"
            onSubmit={handleSignup}
          >

            {/* Name */}

            <label htmlFor="name">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleChange}
            />

            {/* Email */}

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
            />

            {/* Password */}

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
            />

            {/* Confirm Password */}

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={user.confirmPassword}
              onChange={handleChange}
            />

            {/* Error */}

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            {/* Button */}

            <div className="submit-button">

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Signup;