import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormCol from './SubComponent/FormCol'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignupPopUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Owner')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [login, showLogin] = useState(false)

    const nameHandler = (e) => (setName(e.target.value))
    const emailHandler = (e) => (setEmail(e.target.value))
    const phoneHandler = (e) => (setPhone(e.target.value))
    const addressHandler = (e) => (setAddress(e.target.value))
    const passwordHandler = (e) => (setPassword(e.target.value))
    const loginEmailHandler = (e) => (setLoginEmail(e.target.value))
    const loginPasswordHandler = (e) => (setLoginPassword(e.target.value))
    const showSignUpPage = () => (showLogin(false))
    const showLoginPage = () => (showLogin(true))

    const handleRadio = (e) => {
        setRole(e.target.value)
    }

    const submitSignup = (e) => {
        e.preventDefault()
        if (name === "" || email === "" || phone === "" || role === "" || address === "" || password === "") {
            toast.error("Fill every column", {
                position: "bottom-right"
            })
            return;
        }
        const registered = {
            fullName: name,
            email: email,
            phone: phone,
            role: role,
            address: address,
            password: password
        }

        axios.post('http://localhost:4000/app/signup', registered)
            .then(res => console.log(res.data))
            .then(window.location = "/")

        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setPassword('')
        toast.success("Login Successfull", {
            position: "top-right"
        })
    }

    const submiLogin = (e) => {
        e.preventDefault()
        if (loginEmail === "" || loginPassword === "") {
            toast.error("Fill every column", {
                position: "bottom-right"
            })
            return;
        }

        const loginDetail = {
            email: loginEmail,
            password: loginPassword
        }
        console.log(loginDetail)

        axios.post('http://localhost:4000/app/login', loginDetail)
            .then(res => console.log(res.data))
            .catch(e => console.error(e))
            // .then(window.location = "/")
    }

    const showSignupOrLogin = () => {
        if (!login) {
            return (
                <Form onSubmit={submitSignup}>
                    <FormCol name={"Full name"} sendName={"fullName"} value={name} controlId={'Name'} type={"text"} placeholder={"Enter name"} changeHandler={nameHandler} />
                    <FormCol name={"Email"} sendName={"email"} value={email} controlId={'Name'} type={"email"} placeholder={"Enter email"} changeHandler={emailHandler} />
                    <FormCol name={"Phone"} sendName={"phone"} value={phone} controlId={'Phone'} type={"number"} placeholder={"Enter phone"} changeHandler={phoneHandler} />
                    <div key={`default-radio`} className="mb-3">
                        <Form.Check value="owner" onClick={handleRadio} type="radio" id={`default-radio`} name="role" label={`Owner`} />
                        <Form.Check value="customer" onClick={handleRadio} type="radio" id={`radio`} name="role" label={`Customer`} />
                    </div>
                    <FormCol name={"Address"} sendName={"address"} value={address} controlId={'Address'} type={"text"} placeholder={"Enter Address"} changeHandler={addressHandler} />
                    <FormCol name={"Password"} sendName={"password"} value={password} controlId={'Password'} type={"password"} placeholder={"Enter Password"} changeHandler={passwordHandler} />
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            )
        } else {
            return (
                <Form onSubmit={submiLogin} action="/login" method="POST">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={loginEmailHandler} value={loginEmail} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={loginPasswordHandler} value={loginPassword} type="password" placeholder="Password" />
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
                    <Modal.Title id="contained-modal-title-vcenter">
                    <Button variant="primary" onClick={showSignUpPage} default>Sign Up</Button>
                    <Button variant="primary" onClick={showLoginPage}>Log In</Button>
                    </Modal.Title>
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
