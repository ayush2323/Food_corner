import React, { useState, useEffect, useRef } from 'react'
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
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

const NavBar = () => {
    const [modalShow, setModalShow] = useState(false);
    const [login, showLogin] = useState(false)
    const [show, setShow] = useState(true);
    const [first, setFirst] = useState(true)
    const target = useRef(null);
    const [user, setUser] = useState({
        fullName: "", email: "", phone: "", address: "", password: "", role: ""
    })
    const [user_name, setUser_name] = useState(window.sessionStorage.getItem("signup_name"))

    let signin_name, signin_value
    const inputHandler = (e) => {
        signin_name = e.target.name
        signin_value = e.target.value
        setUser({ ...user, [signin_name]: signin_value })
    }

    let user_id = ''
    const submitSignup = async (e) => {
        e.preventDefault()
        const { fullName, email, phone, address, password, role } = user
        axios.post('http://localhost:4000/app/signup', { fullName, email, phone, address, password, role })
            .then(res => {
                console.log(res)
                // user_name = res.data.fullName
                toast.success("Login Successfull", {
                    position: "top-right"
                })
                if (res.data.role === "owner") {
                    // setUser_id(res.data._id)
                    // console.log("yessss")
                    // <OwnerDashboard id={res.data.id} />
                }
                showLogin(true)
                window.sessionStorage.setItem("signup_name", res.data.fullName)
                setUser_name(res.data.fullName)
                user_id = res.data._id
                onHide()
                showNavbar()
                if (res.data.role === "owner") history.push(`/owner_dashboard/${res.data._id}`)
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

    const showNavbar = () => {
        axios.get(`http://localhost:4000/app/signup/${user_id}`)
            .then(res => {
                console.log(res.data)
                setUser_name(res.data.fullName)
                // setDishes(res.data)
            }).catch(e => console.log(e))
        // .finally(setLoad(false))
    }
    
    useEffect(() => {
        if(user_name === null) {
            setShow(false)
        }
    })

    const history = useHistory()
    if (user_id != '') history.push(`/owner_dashboard/${user_id}`)
    const onHide = () => setModalShow(false)
    const seeModalShow = () => { setModalShow(true) }

    const logout = () => {
        console.log("logout clicked")
        window.sessionStorage.removeItem("signup_name")
        setUser_name(null)
        history.push("/")
    }

    const renderLink = () => {
        if (user_name === null) {
            return (
                <ul className="nav-links">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Button variant="secondary" onClick={seeModalShow}>
                            Sign up
                    </Button>

                        <SignUpPopUp
                            show={modalShow}
                            onHide={onHide}
                            user={user}
                            inputHandler={inputHandler}
                            submitSignup={submitSignup}
                        />
                    </li>
                </ul>
            )
        } else return (
            <div>
                {console.log(show)}
                <span style={{ fontSize: '1.6rem', cursor: 'pointer' }} variant="danger" ref={target} onClick={() => setShow(!show)}>{user_name}</span>
                <Overlay target={target.current} show={show} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <span onClick={logout} style={{fontSize: '1.2rem', cursor: 'pointer'}}>Log Out</span>
                        </Tooltip>
                    )}
                </Overlay>
            </div>
        )
    }

    return (
        <nav className="navbar">
            <div className="nav-center">
                <h2>Food <span style={{ color: "red" }}>Corner</span></h2>
                {renderLink()}
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