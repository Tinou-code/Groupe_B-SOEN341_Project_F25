import Footer from "../footer/Footer";
import { ScreenNotificationContext } from "../../App";
import { useContext } from "react";
import { ErrorContext } from "../../App"; 
import "./error-page.css";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {

    const {notifyUser} = useContext(ScreenNotificationContext);
    const {error, setError} = useContext(ErrorContext);
    const routeError = useRouteError();
    const nav = useNavigate();

    if (error) console.error(error);
    if (routeError) console.error (routeError);
    
    const navigateHome = () => {
        setError(e => undefined); 
        nav("/");
        window.location.reload(false);
    }

    return(
        <>
        <div className="error-page-container">
            <div className="main-content">
                <div className="page-header"><h3>Error</h3></div>
                <div className="content-paragraphs">
                    
                    <p>{error ? <i>{error?.status} - {error?.msg}</i>:""}
                       {routeError ? <i>{routeError?.statusText} - {routeError?.message}</i>:""}
                        <br/>An unexpected error occurred. 
                        This page either doesn't exist or you do not have access to this content</p>
                    <button className="btn-secondary" onClick={() => notifyUser("Clicked test notification button")}>test screen notification</button>
                    <button className="btn-primary" onClick={navigateHome}>Home Page</button>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}