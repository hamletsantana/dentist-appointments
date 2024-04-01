import React, {useState} from "react";
import {endodonciaDropdown} from "../../MenuItems/menuItems";
import { Link } from "react-router-dom";
import "./dropdownendodoncia.css";

function DropDownEndodoncia() {
    const [dropdown, setDropdown] = useState(false);

    return(
    <>
        <ul className={dropdown ? "endodoncia-submenu clicked" : "endodoncia-submenu"} onClick={() => setDropdown(!dropdown)}>
            {endodonciaDropdown.map((item) =>{
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

export default DropDownEndodoncia;