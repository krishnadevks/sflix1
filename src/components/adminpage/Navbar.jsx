import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>

        <li>
          <Link to="/admin/upload">Upload Video</Link>
        </li>
        <li>
          <Link to="/admin/player">Video Player</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
