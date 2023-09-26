import React from "react";

const Card = ({ title, img=['', ''], subtitle='', description, content, footer='', width='50%' }) => {
    return (
        <div style={{width: width}}>
            <h1>{title}</h1>
            <img src={img[0]} alt={img[1]} />
            <h2>{subtitle}</h2>
            <p>{description}</p>
            <>{content}</>
            <p>{footer}</p>
        </div>
    )
}

export default Card;