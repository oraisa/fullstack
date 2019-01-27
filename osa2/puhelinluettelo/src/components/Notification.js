import React from "react"

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

export default Notification
