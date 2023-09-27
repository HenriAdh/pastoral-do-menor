import React from "react";

const ALink = ({ link='#', text }) => {
    return (
        <div>
            <a href={link}>{text}</a>
        </div>
    )
}

export default ALink;