import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'
import OwnerDashboard from './../Pages/OwnerDashboard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignupPopUp(props) {
    const [user, setUser] = useState({
        fullName: "demo", email: "demo@gmail.com", phone: "9897979798", address: "1", password: "Password12#", role: ""
    })
    const [login_user, setLoginUser] = useState({
        email: "", password: ""
    })
    const [login, showLogin] = useState(false)
    const history = useHistory()

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
        setLoginUser({...login_user, [login_name]: login_value })
    }

    const showSignUpPage = () => (showLogin(false))
    const showLoginPage = () => (showLogin(true))

    const submitSignup = async (e) => {
        e.preventDefault()
        const { fullName, email, phone, address, password, role } = user
        axios.post('http://localhost:4000/app/signup', {fullName, email, phone, address, password, role})
            .then(res => {
                    toast.success("Login Successfull", {
                        position: "top-right"
                    })
                    if(res.data.role === "owner") {
                        // setUser_id(res.data._id)
                        // console.log("yessss")
                        // <OwnerDashboard id={res.data.id} />
                    }
                    history.push(`/owner_dashboard/${res.data._id}`)
                    // else history.push(`/customer_dashboard/${res.data._id}`)
                    props.onHide(true)
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

    const submiLogin = (e) => {
        e.preventDefault()
        const { email, password } = login_user
        axios.post('http://localhost:4000/app/login', {email, password})
            .then(res => {
                console.log(res)
                if(res.data.role === "owner") history.push(`/owner_dashboard/${res.data._id}`)
                // else history.push(`/customer_dashboard/${res.data._id}`)
                props.onHide(true)
            })
            .catch(e => console.error(e))
    }

    const showSignupOrLogin = () => {
        if (!login) {
            return (
                <Form onSubmit={submitSignup}>
                    <FormCol name={"Full name"} sendName={"fullName"} value={user.name} controlId={'Name'} type={"text"} placeholder={"Enter name"} changeHandler={inputHandler} />
                    <FormCol name={"Email"} sendName={"email"} value={user.email} controlId={'Email'} type={"email"} placeholder={"Enter email"} changeHandler={inputHandler} />
                    <FormCol name={"Phone"} sendName={"phone"} value={user.phone} controlId={'Phone'} type={"number"} placeholder={"Enter phone"} changeHandler={inputHandler} />
                    <div key={`default-radio`} className="mb-3">
                        <div className="adjust_radio">
                            <Form.Check value="owner" onClick={inputHandler} type="radio" id={`default-radio`} name="role" label={`Owner`} />
                            <Form.Check value="customer" onClick={inputHandler} type="radio" id={`radio`} name="role" label={`Customer`} />
                        </div>
                    </div>
                    <FormCol name={"Address"} sendName={"address"} value={user.address} controlId={'Address'} type={"text"} placeholder={"Enter Address"} changeHandler={inputHandler} />
                    <FormCol name={"Password"} sendName={"password"} value={user.password} controlId={'Password'} type={"password"} placeholder={"Enter Password"} changeHandler={inputHandler} />
                    <Button variant="primary" type="submit">Submit</Button>
                    {/* <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">Details</Link> */}
                </Form>
            )
        } else {
            return (
                <Form onSubmit={submiLogin} action="/login" method="POST">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={loginHandler} value={login_user.email} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={loginHandler} value={login_user.password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            )
        }
    }

    return (
        <div>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <div className="adjust_btn">
                        <Button variant="primary" onClick={showSignUpPage}>Sign Up</Button>
                        <Button variant="primary" onClick={showLoginPage}>Log In</Button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {showSignupOrLogin()}
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default SignupPopUp
