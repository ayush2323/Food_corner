import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "../CSS/NavBar.css"
import SignUpPopUp from './SignupPopUp'
import {Modal, Button} from 'react-bootstrap'

const NavBar = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <nav className="nav-bar">
               <div style={{flex:2}}>
                    <h2 style={{fontSize:'2.5rem'}}>Food <span style={{color: "red"}}>Chef</span></h2>
                </div>
                <div style={{flex:3}}>
                <ul className="nav-links" >
                    <li>
                        <Link className="nav-option" to='/'>Home</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to='/about'>About</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to='/about'>Testimonials</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to='/about'>Login/Register</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to='/about'>Contact Us</Link>
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

// func

export default NavBar
