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

    const showSignupOrLogin = () => {
        if (!props.showLoginForm) {
            return (
                <Form onSubmit={props.submitSignup}>
                    <FormCol name={"Full name"} sendName={"fullName"} value={props.user.name} controlId={'Name'} type={"text"} placeholder={"Enter name"} changeHandler={props.inputHandler} />
                    <FormCol name={"Email"} sendName={"email"} value={props.user.email} controlId={'Email'} type={"email"} placeholder={"Enter email"} changeHandler={props.inputHandler} />
                    <FormCol name={"Phone"} sendName={"phone"} value={props.user.phone} controlId={'Phone'} type={"number"} placeholder={"Enter phone"} changeHandler={props.inputHandler} />
                    <div key={`default-radio`} className="mb-3">
                        <div className="adjust_radio">
                            <Form.Check value="customer" onClick={props.inputHandler} type="radio" id={`radio`} name="role" label={`Customer`}  defaultChecked />
                            <Form.Check value="owner" onClick={props.inputHandler} type="radio" id={`default-radio`} name="role" label={`Owner`}/>
                        </div>
                    </div>
                    <FormCol name={"Address"} sendName={"address"} value={props.user.address} controlId={'Address'} type={"text"} placeholder={"Enter Address"} changeHandler={props.inputHandler} />
                    <FormCol name={"Password"} sendName={"password"} value={props.user.password} controlId={'Password'} type={"password"} placeholder={"Enter Password"} changeHandler={props.inputHandler} />
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            )
        } else {
            return (
                <Form onSubmit={props.submiLogin} action="/login" method="POST">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={props.loginHandler} value={props.login_user.email} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={props.loginHandler} value={props.login_user.password} type="password" placeholder="Password" />
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
                        <Button variant="primary" onClick={props.showSignUpPage}>Sign Up</Button>
                        <Button variant="primary" onClick={props.showLoginPage}>Log In</Button>
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