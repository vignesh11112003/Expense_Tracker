import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import LoginIllustration from "../../assets/intro_pages/signup.png";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // --------------------------------
  // Handle Input
  // --------------------------------

  const handleChange = (e) => {

    setLoginData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };


  // --------------------------------
  // Login
  // --------------------------------

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");


    // Validation

    if (
      !loginData.email.trim() ||
      !loginData.password.trim()
    ) {

      setError("Please enter email and password.");

      return;
    }


    try {

      setLoading(true);


      // Get all users

      const response = await fetch(
        "http://localhost:6500/users"
      );


      if (!response.ok) {

        throw new Error(
          "Unable to connect to JSON Server"
        );

      }


      const users = await response.json();


      console.log("Users from server:", users);


      // Find matching user

      const user = users.find(
        (item) =>
          item.email.trim().toLowerCase() ===
            loginData.email.trim().toLowerCase() &&
          String(item.password) ===
            String(loginData.password)
      );


      // User not found

      if (!user) {

        setError("Invalid email or password.");

        return;
      }


      // --------------------------------
      // Login successful
      // --------------------------------

      console.log("Login successful:", user);


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      // Go to dashboard

      navigate("/dashboard");


    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to server. Please make sure JSON Server is running."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="login">

      <div className="login-page">


        {/* ==============================
            LOGIN CONTENT
        ============================== */}

        <div className="login-page-content">

          <div className="login-page-content-header">

            <h1>
              Welcome Back
            </h1>

            <p>
              Login to manage your expenses
            </p>

          </div>


          <form
            className="form1"
            onSubmit={handleLogin}
          >


            {/* Error */}

            {error && (

              <div className="login-error">
                {error}
              </div>

            )}


            {/* Email */}

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
            />


            {/* Password */}

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />


            {/* Login Button */}

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


            {/* Signup Link */}

            <p className="login-signup">

              Don't have an account?{" "}

              <Link to="/signup">
                Create Account
              </Link>

            </p>


          </form>

        </div>


        {/* ==============================
            IMAGE SECTION
        ============================== */}

        <div className="login-page-image">

          <h2>

            Start to manage your{" "}

            <span>MONEY</span>

            <br />

            from{" "}

            <span>NOW</span>

          </h2>


          <img
            src={LoginIllustration}
            alt="Expense management"
          />

        </div>


      </div>

    </div>

  );

}


export default Login;