import { useState } from "react"
import "./notification.css"
import { ScreenNotificationContext } from "../../../App.jsx"
import { useContext } from "react"
import { useEffect } from "react"

export default function Notification() {

    const {screenNotification, setScreenNotification} = useContext(ScreenNotificationContext)

    const [notificationMsg, setNotificationMsg] = useState()
    const [showNotification, setShowNotification] = useState(false)

    function notify(msg) {
        setNotificationMsg(msg);
        setShowNotification(true);
        hideNotification()
    }

    function hideNotification() {
        setTimeout(() => {
            setNotificationMsg("");
            setShowNotification(false);
            setScreenNotification(null)
        }, 3000)
    }

    useEffect(() => {
        if (screenNotification)
            notify(screenNotification)
    }, [screenNotification])

    return(
        <div className="notification-container">
            <div className={"notification"+(showNotification?"-active":"")}>
                <p>{notificationMsg}</p>
            </div>
        </div>
    )
}