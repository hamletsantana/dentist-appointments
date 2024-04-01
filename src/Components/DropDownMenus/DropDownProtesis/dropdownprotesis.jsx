import React, {useState} from "react";
import {protesisDropdown} from "../../MenuItems/menuItems";
import { Link } from "react-router-dom";
import "./dropdownprotesis.css";

function DropDownProtesis() {
    const [dropdown, setDropdown] = useState(false);

    return(
    <>
        <ul className={dropdown ? "protesis-submenu clicked" : "protesis-submenu"} onClick={() => setDropdown(!dropdown)}>
            {protesisDropdown.map(item =>{
                return(
                    <li key={item.id}>
                    <Link to=
                        {item.path} 
                        className={item.cName}
                        onClick={() => setDropdown(false)}
                    >
                        {item.title}
                    </Link>
                    </li>
                );
            })}
        </ul>
    </>
    );
}

export default DropDownProtesis;