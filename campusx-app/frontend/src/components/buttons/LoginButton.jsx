import { useState } from "react"
import "./loginButton.css"

export default function LoginButton() {

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="login-container">
            
            <button className="btn-login" onClick={()=>setIsOpen(o => !o)}>Login</button>  
    
            <div className={"login-dropdown"+(isOpen?"-open":"")}>
                <div>
                <a href="#" className="dropdown-item">Student</a>
                <a href="#" className="dropdown-item">Organizer</a>
                <a href="admin_login.html" className="dropdown-item">Administrator</a>
                </div>
            </div>
        </div>
    )
}