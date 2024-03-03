import React from 'react'
import './styles.css'

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className="loader-container">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Loader