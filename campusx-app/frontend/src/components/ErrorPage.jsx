import Sidebar from "./sidebar/Sidebar"
import Footer from "./footer/Footer"
import { ScreenNotificationContext } from "../App"
import { useContext } from "react"
import { useRouteError } from "react-router-dom"

export default function ErrorPage() {

    const {notifyUser} = useContext(ScreenNotificationContext);
    const error = useRouteError();
    console.error(error);

    return(
        <>
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">
                <div className="page-header"><h3>404</h3></div>
                <div className="content-paragraphs">
                    <p><i>{error.statusText || error.message}</i></p>
                    <p>An unexpected error occurred. 
                        This page either doesn't exist or you do not have access to this content</p>
                    <button onClick={() => notifyUser("Clicked test notification button")}>test screen notification</button>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}