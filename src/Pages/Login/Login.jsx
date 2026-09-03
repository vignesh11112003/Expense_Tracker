import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import signupImage from "../../assets/intro_pages/signup.png";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!loginData.email.trim() || !loginData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const user = users.find(
        (item) =>
          item.email.trim().toLowerCase() ===
            loginData.email.trim().toLowerCase() &&
          String(item.password) ===
            String(loginData.password)
      );

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      console.log("Login successful:", user);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">

      <div className="login-page">

        {/* ================= LEFT SIDE ================= */}

        <div className="login-page-image">

          <h2>
            Welcome Back to{" "}
            <span>Expense Tracker</span>
          </h2>

          <img
            src={signupImage}
            alt="Login illustration"
          />

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="login-page-content">

          <div className="login-page-content-header">
            <h1>Login</h1>
          </div>

          <form
            className="form1"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
            />

            {/* PASSWORD */}

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
            />

            {/* ERROR */}

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

            {/* LOGIN BUTTON */}

            <div className="login-button">

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </div>

            {/* SIGNUP NAVIGATION */}

            <p className="account-link">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </button>

            </p>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Login;