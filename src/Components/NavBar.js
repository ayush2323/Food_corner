import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../CSS/NavBar.css"
import SignUpPopUp from './SignupPopUp'
import { Modal, Button } from 'react-bootstrap'
import { useCostumHooks } from '../context'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'

const NavBar = () => {
    const { login, modalShow, onHide, setModalShow, user_name, seeModalShow, user_id } = useCostumHooks()
    // const [modalShow, setModalShow] = useState(false);
    const history = useHistory()
    console.log(login)
    if(user_id != '') history.push(`/owner_dashboard/${user_id}`)

    const renderButton = () => {
        if (!login) {
            return (
                <Button variant="secondary" onClick={seeModalShow}>
                    Sign up
                </Button>
            )
        } else return <h3>user_name</h3>
    }
    return (
        <nav className="navbar">
            <div className="nav-center">
                <Link style={{ textDecoration: "none" }} to='/'>
                    <h2>Food <span style={{ color: "red" }}>Chef</span></h2>
                </Link>
                <ul className="nav-links">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        {renderButton()}

                        <SignUpPopUp
                            show={modalShow}
                            onHide={onHide}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar

/*
git branch -M main
git remote add origin https://github.com/ayush2323/Food_corner.git
git push -u origin main
*/