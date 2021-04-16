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
import { useCostumHooks } from '../context'

const NavBar = () => {
    const { showRestaurantForm, setShowRestaurantForm } = useCostumHooks()
    const [modalShow, setModalShow] = useState(false);
    const [login, showLogin] = useState(false)
    const [show, setShow] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false)
    const target = useRef(null);
    const [user, setUser] = useState({
        fullName: "", email: "", phone: "", address: "", password: "", role: ""
    })
    const [login_user, setLoginUser] = useState({
        email: "", password: ""
    })
    const [user_name, setUser_name] = useState(window.sessionStorage.getItem("signup_name"))

    let signin_name, signin_value
    const inputHandler = (e) => {
        signin_name = e.target.name
        signin_value = e.target.value
        setUser({ ...user, [signin_name]: signin_value })
    }

    let login_name, login_value
    const loginHandler = (e) => {
        login_name = e.target.name
        login_value = e.target.value
        setLoginUser({ ...login_user, [login_name]: login_value })
    }

    const showSignUpPage = () => (setShowLoginForm(false))
    const showLoginPage = () => (setShowLoginForm(true))

    const submiLogin = (e) => {
        e.preventDefault()
        const { email, password } = login_user
        axios.post('https://foodcornerproject.herokuapp.com/login', { email, password })
            .then(res => {
                console.log(res)
                window.sessionStorage.setItem("signup_name", res.data.fullName)
                setUser_name(res.data.fullName)
                user_id = res.data._id
                onHide()
                showNavbar()
                setShowRestaurantForm(false)
                if (res.data.role === "owner") history.push(`/owner_dashboard/${res.data._id}`)
                else history.push(`/customer_dashboard/${res.data._id}`)
                onHide(true)
            })
            .catch(e => console.error(e))
    }

    let user_id = ''
    const submitSignup = async (e) => {
        e.preventDefault()
        const { fullName, email, phone, address, password, role } = user
        axios.post('https://foodcornerproject.herokuapp.com/signup', { fullName, email, phone, address, password, role })
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
                setShowRestaurantForm(true)
                window.sessionStorage.setItem("signup_name", res.data.fullName)
                setUser_name(res.data.fullName)
                user_id = res.data._id
                onHide()
                showNavbar()
                if (res.data.role === "owner") history.push(`/owner_dashboard/${res.data._id}`)
                else history.push(`/customer_dashboard/${res.data._id}`)
            })
            .catch(e => {
                console.log(e)
                // toast.error("Invalid registration", {
                //     position: "top-right"
                // })
            }
            )
    }

    const showNavbar = () => {
        axios.get(`https://foodcornerproject.herokuapp.com/signup/${user_id}`)
            .then(res => {
                console.log(res.data)
                setUser_name(res.data.fullName)
                // setDishes(res.data)
            }).catch(e => console.log(e))
        // .finally(setLoad(false))
    }

    useEffect(() => {
        if (user_name === null) {
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
                        <Button id="signup_btn" variant="secondary" onClick={seeModalShow}>
                            <span id="signup_val">Sign up</span>
                        </Button>

                        <SignUpPopUp
                            show={modalShow}
                            onHide={onHide}
                            user={user}
                            inputHandler={inputHandler}
                            submitSignup={submitSignup}
                            submiLogin={submiLogin}
                            login_user={login_user}
                            loginHandler={loginHandler}
                            showLoginForm={showLoginForm}
                            showSignUpPage={showSignUpPage}
                            showLoginPage={showLoginPage}
                        />
                    </li>
                </ul>
            )
        } else return (
            <div>
                <span style={{ fontSize: '1.6rem', cursor: 'pointer' }} variant="danger" ref={target} onClick={() => setShow(!show)}>{user_name}</span>
                <Overlay target={target.current} show={show} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <span onClick={logout} style={{ fontSize: '1.2rem', cursor: 'pointer', padding: '1rem' }}>Log Out</span><br></br>
                        </Tooltip>
                    )}
                </Overlay>
            </div>
        )
    }

    return (
        <nav className="navbar">
            <div className="nav-center">
                <div className="nav_left">
                    <h2 className="logo">Food <span style={{ color: "red" }}>Corner</span></h2>
                </div>
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