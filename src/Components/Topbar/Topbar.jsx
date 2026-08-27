import "./Topbar.css";

function Topbar() {

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;


  return (

    <header className="topbar">

      {/* Left Section */}

      <div className="topbar-left">

        <button className="menu-btn">
          ☰
        </button>


        <div className="search-box">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search expenses..."
          />

          <span className="search-shortcut">
            Ctrl /
          </span>

        </div>

      </div>


      {/* Right Section */}

      <div className="topbar-right">

        <button className="notification-btn">

          ♧

          <span className="notification-dot"></span>

        </button>


        <div className="profile">

          <div className="profile-avatar">

            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}

          </div>


          <div className="profile-info">

            <h4>
              {user?.name || "User"}
            </h4>

            <p>
              Premium User
            </p>

          </div>


          <span className="profile-arrow">
            ⌄
          </span>

        </div>

      </div>

    </header>

  );
}

export default Topbar;