import React from "react";

const Link = ({ link='#', text }) => {
    return (
        <div>
            <a href={link}>{text}</a>
        </div>
    )
}

export default Link;