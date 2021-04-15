import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../Images/image1.webp'
import img2 from '../Images/image2.webp'
import img3 from '../Images/image3.webp'
import "../CSS/Header.css"

const Header = () => {
    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default Header