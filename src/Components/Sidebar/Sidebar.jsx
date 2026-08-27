import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

  const getNavClass = ({ isActive }) => {
    return isActive
      ? "sidebar-link active"
      : "sidebar-link";
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          💼
        </div>

        <div className="logo-content">

          <h2>
            Expense<span>X</span>
          </h2>

          <p>
            Track. Manage. Save.
          </p>

        </div>

      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className={getNavClass}
        >
          <span className="sidebar-icon">
            ▣
          </span>

          <span>
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/expenses"
          className={getNavClass}
        >
          <span className="sidebar-icon">
            ▤
          </span>

          <span>
            Expenses
          </span>
        </NavLink>

        

        {/* Settings */}
        <button
          type="button"
          className="sidebar-link sidebar-button"
        >
          <span className="sidebar-icon">
            ⚙
          </span>

          <span>
            Settings
          </span>
        </button>

      </nav>

      {/* Bottom Navigation */}
      <div className="sidebar-bottom">

        <button
          type="button"
          className="sidebar-link sidebar-button"
        >
          <span className="sidebar-icon">
            ?
          </span>

          <span>
            Help & Support
          </span>
        </button>

        <NavLink
          to="/login"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            ↪
          </span>

          <span>
            Logout
          </span>
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;