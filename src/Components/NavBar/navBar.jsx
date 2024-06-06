import React, { useState } from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
import { menuItems } from "../MenuItems/menuItems";
import Authenticate from "../../Components/Authenticator/authenticator";
import DropDownEndodoncia from "../DropDownMenus/DropDownEndodoncia/dropdownendodoncia";
import DropDownPeriodoncia from "../DropDownMenus/DropDownPeriodoncia/dropdownperiodoncia";
import DropDownOdontopediatria from "../DropDownMenus/DropDownOdontopediatria/dropdownodontopediatria";
import DropDownOrtodoncia from "../DropDownMenus/DropDownOrtodoncia/dropdownortodoncia";
import DropDownProtesis from "../DropDownMenus/DropDownProtesis/dropdownprotesis";
function NavBar() {
  const [dropdownEndodoncia, setDropdownEndodoncia] = useState(false);
  const [dropdownPeriodoncia, setDropdownPeriodoncia] = useState(false);
  const [dropdownOdontopediatria, setDropdownOdontopediatria] = useState(false);
  const [dropdownOrtodoncia, setDropdownOrtodoncia] = useState(false);
  const [dropdownProtesis, setDropdownProtesis] = useState(false);

  return (
    <>
      <nav className="navbar">
        <ul className="nav-items">
          {menuItems.map((item) => {
            if (item.title === "Endodoncias") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownEndodoncia(true)}
                  onMouseLeave={() => setDropdownEndodoncia(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdownEndodoncia && <DropDownEndodoncia />}
                </li>
              );
            } else if (item.title === "Periodoncia") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownPeriodoncia(true)}
                  onMouseLeave={() => setDropdownPeriodoncia(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdownPeriodoncia && <DropDownPeriodoncia />}
                </li>
              );
            } else if (item.title === "Odontopediatría") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownOdontopediatria(true)}
                  onMouseLeave={() => setDropdownOdontopediatria(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdownOdontopediatria && <DropDownOdontopediatria />}
                </li>
              );
            } else if (item.title === "Ortodoncia") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownOrtodoncia(true)}
                  onMouseLeave={() => setDropdownOrtodoncia(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdownOrtodoncia && <DropDownOrtodoncia />}
                </li>
              );
            } else if (item.title === "Prótesis") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownProtesis(true)}
                  onMouseLeave={() => setDropdownProtesis(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdownProtesis && <DropDownProtesis />}
                </li>
              );
            } else if (item.title === "Dashboard") {
              return (
                <li key={item.id} className={item.cName}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            }

            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
