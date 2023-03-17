import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthConsumer from "../hooks/useAuth";

import "../styles/navbar.css"
import logo from "../assets/VAIBElogo.svg"

function Navbar() {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => { setClicked(!clicked) }

    const [auth] = AuthConsumer()

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    <NavLink to="/"><img src={logo} className="App-logo" alt="Logo" />
                    </NavLink>
                </div>
                    <div id='menuList'>
                        <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
                            {
                                auth.isAuth ?
                                    <>
                                        <li><NavLink id='navbar' className="nav-link" to="/home">Home</NavLink></li>
                                        <li><NavLink id='navbar' className="nav-link" to="/profile">My profile</NavLink></li>
                                    </>
                                    :
                                    <li><NavLink id='navbar' className="nav-link" to="/login">Log in</NavLink></li>
                            }

                            <li><NavLink id='navbar' to="/aboutUs">About Us</NavLink></li>

                            {
                                auth.isAuth ?
                                    <li><NavLink id='navbar' className="nav-link" to="/logout"><i className="fa-solid fa-right-to-bracket"></i></NavLink></li>
                                    :
                                    null
                            }

                        </ul>
                    </div>
            </nav>
        </>
    )
}


export default Navbar;