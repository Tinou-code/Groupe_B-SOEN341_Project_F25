import Sidebar from "../sidebar/Sidebar"
import HeroBanner from "./home-page/HeroBanner"
import Footer from "../footer/Footer"
import { ScreenNotificationContext } from "../../App"
import { useContext } from "react"

export default function TempPage() {

    const {notifyUser} = useContext(ScreenNotificationContext);

    return(
        <>
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">
                <div className="page-header"><h3>404</h3></div>
                <div className="content-paragraphs">
                    
                    <p>This page is unavailable. 
                        It either doesn't exist or you do not have access to this content</p>
                    <button onClick={() => notifyUser("Clicked test notification button")}>test notification</button>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}