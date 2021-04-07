import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "../CSS/NavBar.css"
import SignUpPopUp from './SignupPopUp'
import {Modal, Button} from 'react-bootstrap'

const NavBar = () => {
    const [modalShow, setModalShow] = React.useState(false);
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
                    <li>
                    <Button variant="secondary" onClick={() => setModalShow(true)}>
                        Sign up
                    </Button>

                    <SignUpPopUp
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar

// git branch -M main
// git remote add origin https://github.com/ayush2323/temp.git
// git push -u origin main