import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import "./login-page.css"
import { useContext, useEffect, useState } from "react";
import { handleLogin } from "../../../../../api/login";
import { CurrentUserContext, ScreenNotificationContext} from "../../../App";
import { LoginUserTypeSelector } from "./UserTypeSelector";
import UserIdInput from "./UserIdInput";
import { getIdPrefix } from "./UserIdInput";
import FormStatusMsg from "../../utils/formStatusMsg";

export default function LoginPage() {

    const {notifyUser} = useContext(ScreenNotificationContext);

         const params = useParams();
         const navigate = useNavigate();
         const acceptedUserType = ["student", "organizer", "admin"];
     
         useEffect(() => {
             //console.log(params);
             if (!params.userType) navigate("/login/student");
             else if (!acceptedUserType.includes(params.userType)) navigate("/error");
             setLoginStatus(l => 0);
         }, [params])

        const [userName, setUserName] = useState("");
        const [password, setPassword] = useState("");
        const [loginStatus, setLoginStatus] = useState(0)
        const [errMsg, setErrMsg] = useState("");

        const {setCurrentUser} = useContext(CurrentUserContext)

        const login = async (event) => {
            event.preventDefault();
            const response = await handleLogin(params.userType, getIdPrefix(params)+userName, password)
            //console.log("login result", response)
            if (response.status === 200) {
                setCurrentUser(u => u = {...response.user, isLoggedIn:true})
                sessionStorage.setItem("loggedUser", JSON.stringify(response.user))
            }
            setLoginStatus(l => response.status)
            setErrMsg(response.msg)
            notifyUser(response.msg);
        }

        
        useEffect(() => {
            if (loginStatus === 200) {
                setTimeout(() => {
                  //console.log("nav home")
                  navigate("/");  
                },1000);  
            }
        },[loginStatus])

        return (
            <div className="login-main-content">
                <div className="btn-back-home-container">
                    <Link to="/" className="btn-back-home">{"< Home"}</Link>
                </div>
                <div className="login-box">

                    <LoginUserTypeSelector params={params} route={"/login"}/>

                    <div className="form-container">

                        <FormStatusMsg status={loginStatus} msg={errMsg}/>

                        <h2>Login</h2>

                        <form id="loginForm" onSubmit={login}>

                            <UserIdInput userName={userName} setUserName={setUserName}/>

                            <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-input" 
                                value={password} onChange={e => setPassword(p => e.target.value)} required/>
                            </div>

                            <button className="btn-primary" type="submit">
                            Login
                            </button>
                        </form>                       

                        <p className="register-text">Don’t have an account? 
                            <Link to="/register/student" className="register-link"> Register</Link>
                        </p>
                    </div>
                </div>
            <Footer/>
            </div>
        )
    }