import React, { useState, useContext, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import OwnerDashboard from './Pages/OwnerDashboard'
import { Redirect, Link } from 'react-router-dom'
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    console.log(children)
    const [login, setLogin] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [dishes, setDishes] = useState([])
    const [load, setLoad] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = () => {
        console.log("handleSubmit")
    }

    const searchCocktail = (e) => {
        console.log("searchCocktail")
    }
    
    const showDishes = () => {
        setLoad(true)
        axios.get(`http://localhost:4000/app/dishes`)
        .then(res => {
            console.log(res.data)
            setDishes(res.data)
        }).catch(e => console.log(e))
        .finally(setLoad(false))
    }

    useEffect(() => {
        showDishes()
    }, [searchTerm])

    const [user, setUser] = useState({
        fullName: "i", email: "i@gmail.com", phone: "9999888877", address: "1", password: "Password12#", role: "owner"
    })
    // const [login_user, setLoginUser] = useState({
    //     email: "", password: ""
    // })
    const [login_form, showLogin] = useState(false)

    let signin_name, signin_value
    const inputHandler = (e) => {
        signin_name = e.target.name
        signin_value = e.target.value
        setUser({ ...user, [signin_name]: signin_value })
    }

    // let login_name, login_value
    // const loginHandler = (e) => {
    //     login_name = e.target.name
    //     login_value = e.target.value
    //     setLoginUser({ ...login_user, [login_name]: login_value })
    // }

    const showSignUpPage = () => (showLogin(false))
    const showLoginPage = () => (showLogin(true))
    const seeModalShow = () => {setModalShow(true)}

    let user_name = '', user_id = ''
    const submitSignup = async (e) => {
        e.preventDefault()
        const { fullName, email, phone, address, password, role } = user
        axios.post('http://localhost:4000/app/signup', { fullName, email, phone, address, password, role })
            .then(res => {
                toast.success("Login Successfull", {
                    position: "top-right"
                })
                setLogin(true)
                user_name = res.data.fullName
                user_id = res.data._id
                onHide()
                const path = `/owner_dashboard/${res.data._id}`
                // <Link to='path' />
                // return <Redirect to={path} />
                // history.push(`/owner_dashboard/${res.data._id}`)
                // else history.push(`/customer_dashboard/${res.data._id}`)
            })
            .catch(e => {
                console.log(e)
                // toast.error("Invalid registration", {
                //     position: "top-right"
                // })
            })
    }

    const onHide=() => setModalShow(false)

    return (
        <AppContext.Provider value={{setSearchTerm, login, setLogin, user, inputHandler, showSignUpPage, showLoginPage, submitSignup, login_form, modalShow, setModalShow, onHide, ToastContainer, user_name, seeModalShow, user_id, showDishes, load, dishes, searchTerm}}>{children}</AppContext.Provider>
    )
}

export const useCostumHooks = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider}