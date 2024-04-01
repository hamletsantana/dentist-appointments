import React, {useState} from "react";
import {periodonciaDropdown} from "../../MenuItems/menuItems";
import { Link } from "react-router-dom";
import "./dropdownperiodoncia.css";

function DropDownPeriodoncia() {
    const [dropdown, setDropdown] = useState(false);

    return(
    <>
        <ul className={dropdown ? "periodoncia-submenu clicked" : "periodoncia-submenu"} onClick={() => setDropdown(!dropdown)}>
            {periodonciaDropdown.map(item =>{
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

export default DropDownPeriodoncia;