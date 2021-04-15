import React from 'react'
import "../CSS/Footer.css"

const Footer = () => {
    return (
        <div className="bottom">
            <footer className="footer">
                <div className="footer-div">
                    <ul>
                        <li><i className="fab fa-instagram"></i> Github</li>
                        <li><i className="fab fa-facebook"></i> Facebook</li>
                        <li><i className="fab fa-twitter-square"></i> Twitter</li>
                        <li><i className="fab fa-pinterest"></i> LinkedIn</li>
                    </ul>
                </div>
            </footer>
            <div className="footer-bottom">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2021 © FoodCorner™ Pvt Ltd. All rights reserved.</div>
        </div>
    )
}

export default Footer
