import React, {useState} from "react";
import {odontopediatriaDropdown} from "../../MenuItems/menuItems";
import { Link } from "react-router-dom";
import "./dropdownodontopediatria.css";

function DropDownOdontopediatria() {
    const [dropdown, setDropdown] = useState(false);

    return(
    <>
        <ul className={dropdown ? "odontopediatria-submenu clicked" : "odontopediatria-submenu"} onClick={() => setDropdown(!dropdown)}>
            {odontopediatriaDropdown.map(item =>{
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

export default DropDownOdontopediatria;