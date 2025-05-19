import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = ({ isAuthenticated, setAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  // console.log("menuOpen:", menuOpen)

  function onLogout() {
    if(!window.confirm("Are you sure you want to logout?")) return
    sessionStorage.removeItem('isAuthenticated');
    setAuthenticated(false);
  }
  
  return (
    <>
      <header className="header">
        <div className="logo">
          <i className="fas fa-hospital"></i>
          <Link to="/">VK BONE AND JOINT</Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/service">Services</Link>
          <Link to="/contact">Contact</Link>
          {isAuthenticated && <button onClick={onLogout} className="logout-btn">Logout</button>}
        </nav>
        <div onClick={() => setMenuOpen(true)} className="hamburgerBtn">&#9776;</div>
      </header>

      {menuOpen && (
        <aside className="aside_menu">
          <div onClick={() => setMenuOpen(false)} className="menuExit">&#10006;</div>
          <menu>
            <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
            <Link onClick={() => setMenuOpen(false)} to="/about">About</Link>
            <Link onClick={() => setMenuOpen(false)} to="/service">Services</Link>
            <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
            {isAuthenticated && <button onClick={onLogout} className="logout-btn">Logout</button>}
          </menu>
        </aside>
      )}
    </>
  );
};
