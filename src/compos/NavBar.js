import React from "react";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { AppContext } from "../context";
import { auth } from "../firebase/config";
import logo from "../logo300.png";
const NavBar = () => {
  const { isUser, setBar, bar } = useContext(AppContext);
  console.log(bar);
  if (isUser) {
    return (
      <nav className="navbar" dir="rtl">
        <img src={logo} alt="logo" className="logo" />
        <ul className={bar ? "active" : null}>
          <li onClick={() => setBar(false)}>
            <Link to="/messages">الرسائل</Link>
          </li>
          <li
            onClick={() => {
              auth.signOut();
              setBar(false);
            }}
          >
            <Link to="/">خروج </Link>
          </li>

          <li onClick={() => setBar(false)}>
            <Link to="/about">عن صراحة</Link>
          </li>
        </ul>
        <div className="burger" onClick={() => setBar((prevBar) => !prevBar)}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar" dir="rtl">
        <img src={logo} alt="logo" className="logo" />
        <ul className={bar ? "active" : null}>
          <li onClick={() => setBar(false)}>
            <Link to="/">الرئيسية</Link>
          </li>
          <li onClick={() => setBar(false)}>
            <Link to="/signin">دخول</Link>
          </li>
          <li onClick={() => setBar(false)}>
            <Link to="/signup">تسجيل</Link>
          </li>
          <li onClick={() => setBar(false)}>
            <Link to="/about">عن صراحة</Link>
          </li>
        </ul>
        <div className="burger" onClick={() => setBar((prevBar) => !prevBar)}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    );
  }
};

export default NavBar;
