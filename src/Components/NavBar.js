import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../CSS/NavBar.css"
import SignUpPopUp from './SignupPopUp'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'
import OwnerDashboard from './../Pages/OwnerDashboard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal, Button } from 'react-bootstrap'

const NavBar = () => {
    const [modalShow, setModalShow] = useState(false);
    const [login, showLogin] = useState(false)
    const [user, setUser] = useState({
        fullName: "demo", email: "demo@gmail.com", phone: "9897979798", address: "1", password: "Password12#", role: ""
    })

    let signin_name, signin_value
    const inputHandler = (e) => {
        signin_name = e.target.name
        signin_value = e.target.value
        setUser({ ...user, [signin_name]: signin_value })
    }

    let user_name = '', user_id = ''
    const submitSignup = async (e) => {
        e.preventDefault()
        const { fullName, email, phone, address, password, role } = user
        axios.post('http://localhost:4000/app/signup', {fullName, email, phone, address, password, role})
            .then(res => {
                console.log(res.data)
                console.log(res.data.role)
                    toast.success("Login Successfull", {
                        position: "top-right"
                    })
                    if(res.data.role === "owner") {
                        // setUser_id(res.data._id)
                        // console.log("yessss")
                        // <OwnerDashboard id={res.data.id} />
                    }
                    showLogin(true)
                    user_name = res.data.fullName
                    user_id = res.data._id
                    onHide()
                    if(res.data.role === "owner") history.push(`/owner_dashboard/${res.data._id}`)
                    else history.push(`/customer_dashboard/${res.data._id}`)
                }
            )
            .catch(e => {
                    console.log(e)
                    // toast.error("Invalid registration", {
                    //     position: "top-right"
                    // })
                }
            )
    }

    const history = useHistory()
    if(user_id != '') history.push(`/owner_dashboard/${user_id}`)
    const onHide=() => setModalShow(false)
    const seeModalShow = () => {setModalShow(true)}

    const renderButton = () => {
        if (!login) {
            return (
                <Button variant="secondary" onClick={seeModalShow}>
                    Sign up
                </Button>
            )
        } else return <h3>{user.fullName}</h3>
    }

    return (
        <nav className="navbar">
            <div className="nav-center">
                {/* <Link style={{ textDecoration: "none" }} to='/'> */}
                    <h2>Food <span style={{ color: "red" }}>Corner</span></h2>
                {/* </Link> */}
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
                            user={user}
                            inputHandler={inputHandler}
                            submitSignup={submitSignup}
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