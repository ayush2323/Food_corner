import React from 'react'
import { Link } from 'react-router-dom'
import "../CSS/NavBar.css"

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-center">
                <Link style={{textDecoration: "none"}} to='/'>
                    <h2>Food <span style={{color: "red"}}>Chef</span></h2>
                </Link>
                <ul className="nav-links">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
