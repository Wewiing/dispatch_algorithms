import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/form" className={({ isActive }) => isActive ? "active" : ""}>
                            Ingresar Procesos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/simulation" className={({ isActive }) => isActive ? "active" : ""}>
                            Simulación
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
