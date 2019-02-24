import React from "react"
import PropTypes from "prop-types"

const Notification = ({message, notificationClass}) => {
    if(message === ""){
        return null
    } else {
        return (
            <div className={notificationClass}>
                {message}
            </div>
        )
    }
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    notificationClass: PropTypes.string.isRequired
}

export default Notification
