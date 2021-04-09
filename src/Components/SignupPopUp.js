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
    const [login_user, setLoginUser] = useState({
        email: "", password: ""
    })
    const [showLoginForm, setShowLoginForm] = useState(false)
    const history = useHistory()

    let login_name, login_value
    const loginHandler = (e) => {
        login_name = e.target.name
        login_value = e.target.value
        setLoginUser({...login_user, [login_name]: login_value })
    }

    const showSignUpPage = () => (setShowLoginForm(false))
    const showLoginPage = () => (setShowLoginForm(true))

    const submiLogin = (e) => {
        e.preventDefault()
        const { email, password } = login_user
        axios.post('http://localhost:4000/app/login', {email, password})
            .then(res => {
                console.log(res)
                if(res.data.role === "owner") history.push(`/owner_dashboard/${res.data._id}`)
                else history.push(`/customer_dashboard/${res.data._id}`)
                props.onHide(true)
            })
            .catch(e => console.error(e))
    }

    const showSignupOrLogin = () => {
        if (!showLoginForm) {
            return (
                <Form onSubmit={props.submitSignup}>
                    <FormCol name={"Full name"} sendName={"fullName"} value={props.user.name} controlId={'Name'} type={"text"} placeholder={"Enter name"} changeHandler={props.inputHandler} />
                    <FormCol name={"Email"} sendName={"email"} value={props.user.email} controlId={'Email'} type={"email"} placeholder={"Enter email"} changeHandler={props.inputHandler} />
                    <FormCol name={"Phone"} sendName={"phone"} value={props.user.phone} controlId={'Phone'} type={"number"} placeholder={"Enter phone"} changeHandler={props.inputHandler} />
                    <div key={`default-radio`} className="mb-3">
                        <div className="adjust_radio">
                            <Form.Check value="owner" onClick={props.inputHandler} type="radio" id={`default-radio`} name="role" label={`Owner`} />
                            <Form.Check value="customer" onClick={props.inputHandler} type="radio" id={`radio`} name="role" label={`Customer`} />
                        </div>
                    </div>
                    <FormCol name={"Address"} sendName={"address"} value={props.user.address} controlId={'Address'} type={"text"} placeholder={"Enter Address"} changeHandler={props.inputHandler} />
                    <FormCol name={"Password"} sendName={"password"} value={props.user.password} controlId={'Password'} type={"password"} placeholder={"Enter Password"} changeHandler={props.inputHandler} />
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