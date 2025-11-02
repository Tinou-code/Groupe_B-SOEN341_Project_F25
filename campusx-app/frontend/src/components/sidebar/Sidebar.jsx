import { useContext, useEffect, useState } from "react"
import "./sideBar.css"
import { CurrentUserContext } from "../../App"
import { ScreenNotificationContext } from "../../App"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { handleLogout } from "../../../../api/login"
import UserIcon from "./UserIcon"

const studentNavLinks = [
    {path:"/events", name:"Browse Events"},
    {path:"/myevents", name:"My Saved Events"},
    {path:"/mytickets", name:"My Tickets"},
    {path:"/mycalendar", name:"My Calendar"},  
]

const orgNavLinks = [
    {path:"/organizer/dashboard", name:"Dashboard"},
    {path:"/organizer/create", name:"Create an Event"},
    {path:"/organizer/events", name:"My Organization Events"}, 
    {path:"/events", name:"Browse All Events"},
]

const adminNavLinks = [
    {path:"/admin/dashboard", name:"Dashboard"}, 
    {path:"/admin/organizers", name:"Manage Organizations"}, 
    {path:"/events", name:"Browse All Events"},
]

export default function Sidebar() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const {notifyUser} = useContext(ScreenNotificationContext);
    
    const navigate = useNavigate()
    function logout() {
        notifyUser("Logging out")
        setTimeout(() => {
        handleLogout();
        setCurrentUser(u => undefined)
        navigate("/");
        }, 1000);
    }

    return(
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>CampX</h2>
            </div>

             <UserIcon/> 

            <div>
            <ul className="nav-menu">
                <li><SidebarLink path="/" name="Home"/></li>
                {currentUser && currentUser?.isLoggedIn ? 
                    <div className="user-specific-links">

                        {currentUser?.type === "student" ? studentNavLinks.map(l => <li key={l.name}><SidebarLink path={l.path} name={l.name}/></li>):""}
                        {currentUser?.type === "organizer" ? 
                            (currentUser?.isApproved ? 
                                orgNavLinks.map(l => <li key={l.name}><SidebarLink path={l.path} name={l.name}/></li>)
                            :<p id="org-unapproved-msg">
                                Some options are hidden because your account has not been approved yet. 
                                Please login again later or contact the administration.</p>):""}

                        {currentUser?.type === "admin" ? adminNavLinks.map(l => <li key={l.name}><SidebarLink path={l.path} name={l.name}/></li>):""}
                    <li className="logout-nav-link" onClick={() => logout()}>Logout</li>
                    </div> : 
                    <li><SidebarLink path="/login/student" name="Login"/></li>}
                <li><SidebarLink path="/about" name="About"/></li>
                <li><SidebarLink path="/contact" name="Contact"/></li>
            </ul>
            </div>
        </div>
    )
}

//component for sidebar buttons
function SidebarLink({path, name}) {

    const location = useLocation();
    const currentPath = location.pathname;

    return(
        path === "/" || path === "/events" ?
         <Link  
            to={path} className={"nav-link"+(currentPath === path ? "-active":"")}>{name}
        </Link>:
        <Link  
            to={path} className={"nav-link"+(currentPath === path || currentPath.includes(path) ? "-active":"")}>{name}
        </Link>
    )
}

