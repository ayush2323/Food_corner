import React from 'react'
import home from '../Images/home.jpg'
import "../CSS/Header.css"

const Header = () => {
    return (
        <div>
            <img style={{width:"100%"}} src={home}/>
        </div>
    )
}

export default Header
