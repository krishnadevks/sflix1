import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/users">User Management</Link></li>
        <li><Link to="/movies">Movie Library</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
