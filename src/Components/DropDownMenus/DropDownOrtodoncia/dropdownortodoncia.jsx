import React, {useState} from "react";
import {ortodonciaDropdown} from "../../MenuItems/menuItems";
import { Link } from "react-router-dom";
import "./dropdownortodoncia.css";

function DropDownOrtodoncia() {
    const [dropdown, setDropdown] = useState(false);

    return(
    <>
        <ul className={dropdown ? "ortodoncia-submenu clicked" : "ortodoncia-submenu"} onClick={() => setDropdown(!dropdown)}>
            {ortodonciaDropdown.map(item =>{
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

export default DropDownOrtodoncia;