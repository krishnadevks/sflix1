import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MovieStream Admin</div>
      <div className="profile">
        <img src="/profile-icon.png" alt="Admin Profile" />
        <span>Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
