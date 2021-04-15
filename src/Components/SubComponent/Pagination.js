import React, {useState, useEffect} from 'react'

const Pagination = ({showPerPage, onPaginationChange, total}) => {
    const [counter, setCounter] = useState(1)
    const [numberOfButton, setNumberOfButton] = useState(Math.ceil(total/showPerPage))

    useEffect(() => {
        const value = showPerPage*counter
        onPaginationChange(value - showPerPage, value)
    }, [counter])

    const onButtonClick = (type) => {
        if(type === "prev") {
            if(counter === 1) setCounter(1)
            else setCounter(counter - 1)
        }
        if(type === "next") {
            if(counter === numberOfButton) setCounter(counter)
            else setCounter(counter + 1)
        }
    }

    return (
        <div className="d-flex justify-content-center mb-3">
            <button onClick={() => onButtonClick('prev')} className="btn btn-primary">Prev</button>
            {new Array(numberOfButton).fill("").map((el, index) => (
                <li style={{listStyleType: 'none'}} className={`page-item ${index + 1 === counter ? "active" : null}`}>
                    <button onClick={() => setCounter((index + 1))} className="btn btn-primary">{index+1}</button>
                </li>
            ))}
            <button onClick={() => onButtonClick('next')} className="btn btn-primary">Next</button>
        </div>
    )
}

export default Pagination
