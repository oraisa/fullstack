import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Notification = ({notification, error, notificationClass}) => {
    const message = notificationClass === "error" ? error : notification
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
    notificationClass: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    error: state.notification.error,
    notification: state.notification.notification
})

export default connect(mapStateToProps)(Notification)
