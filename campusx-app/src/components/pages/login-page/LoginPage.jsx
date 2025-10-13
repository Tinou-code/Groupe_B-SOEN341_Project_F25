import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";
import "./loginPage.css"
import { useContext, useEffect, useState } from "react";
import handleLogin from "../../../../api/login";
import { CurrentUserContext } from "../../../App";

   export default function LoginPage() {
        const params = useParams();
        useEffect(() => {
            console.log(params);
            setLoginStatus(l => "0")
        }, [params])

        const [userName, setUserName] = useState("");
        const [password, setPassword] = useState("");
        const [loginStatus, setLoginStatus] = useState("0")

        const {setCurrentUser} = useContext(CurrentUserContext)

        function login() {
            const loginResult = handleLogin(params.userType, userName, password)
            if (loginResult === "200") setCurrentUser(u => u = {id:userName, userType:params.userType, isLoggedIn:true})
            setLoginStatus(l => loginResult)
        }

        const navigate = useNavigate();
        useEffect(() => {
            if (loginStatus === "200") {
                setTimeout(() => {
                  console.log("nav home")
                  navigate("/");  
                },3000);  
            }
        },[loginStatus])

        return (
            <div className="main-content">
                <Link to="/" className="btn-back-home">{"< Back"}</Link>
                <div className="login-box">
                    <div className="login-box-header">
                        <Link className={"user-type-box" + (Object.entries(params).length === 0 | params.userType === "student" ? "-active":"")}
                            to="/login/student">Student</Link>
                        <Link className={"user-type-box" + (params.userType === "organizer" ? "-active":"")} 
                            to="/login/organizer">Organizer</Link>
                        <Link className={"user-type-box"+ (params.userType === "admin" ? "-active":"")} 
                            to="/login/admin">Administrator</Link>
                    </div>
                    
                    <div className="form-container">
                        {loginStatus === "400" ? "Missing username or password":""}
                        {loginStatus === "404" ? "User not found":""}
                        {loginStatus === "200" ? "Login successful!":""}

                        <h2>Login</h2>

                            <div id="loginForm">
                                <div className="form-group">
                                <label className="form-label" htmlFor="username">
                                    {Object.entries(params).length === 0 | params.userType === "student" ? "Student":null}
                                    {params.userType === "organizer" ? "Organizer":null}
                                    {params.userType === "admin" ? "Admin":null} ID
                                </label>
                                <input type="text" id="username" className="form-input" 
                                    value={userName} onChange={e => setUserName(u => e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-input" 
                                    value={password} onChange={e => setPassword(p => e.target.value)} required/>
                                </div>

                                <button className="btn-primary" onClick={() => login()}>
                                Login
                                </button>
                            </div>                       

                        <p className="register-text">Don’t have an account? 
                            <Link to="/register" className="register-link"> Register</Link>
                        </p>
                    </div>
                </div>
            <Footer/>
            </div>
        )
    }