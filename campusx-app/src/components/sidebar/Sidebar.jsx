import { useContext, useEffect, useState } from "react"
import "./sideBar.css"
import { CurrentUserContext } from "../../App"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { handleLogout } from "../../../api/login"

const userNavLinks = [
    {path:"/events", name:"Browse Events"},
    {path:"/myevents", name:"My Saved Events"},
    {path:"/mytickets", name:"My Tickets"},
    {path:"/calendar", name:"My Calendar"},  
]

export default function Sidebar() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [showLogout, setShowLogout] = useState(false);
    
    function logout() {
        setShowLogout(l => true)
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (showLogout)
        setTimeout(() => {
        handleLogout();
        setCurrentUser(u => undefined)
        setShowLogout(l => false);
        navigate("/");
        }, 3000);
    }, [showLogout]);

    return(
        <div className="sidebar">
            <div className={"logout-message"+(showLogout?"-active":"")}>
                Logging out
            </div>
            <div className="sidebar-header">
                <h2>CampX</h2>
            </div>
            <div>
            <ul className="nav-menu">
                <li><SidebarLink path="/" name="Home"/></li>
                {currentUser && currentUser.isLoggedIn ? 
                    <div className="user-specific-links">
                        {userNavLinks.map(l => <li key={l.name}><SidebarLink path={l.path} name={l.name}/></li>)}
                    <li className="nav-link" onClick={() => logout()}>Logout</li>
                    </div> : 
                    <li><SidebarLink path="/login/student" name="Login"/></li>}
                <li><SidebarLink path="/about" name="About"/></li>
                <li><SidebarLink path="/contact" name="Contact"/></li>
            </ul>
            </div>
        </div>
    )
}

function SidebarLink({path, name}) {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <Link  
            to={path} className={"nav-link"+(currentPath === path? "-active":"")}>{name}
        </Link>
    )
}