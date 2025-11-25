import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../footer/Footer";
import {RegisterUserTypeSelector} from "./UserTypeSelector";
import UserIdInput from "./UserIdInput";
import { handleRegister } from "../../../../../api/register";
import { getIdPrefix } from "./UserIdInput";
import FormStatusMsg from "../../utils/formStatusMsg";
import { ScreenNotificationContext } from "../../../App";

export default function RegisterPage() {

    const {notifyUser} = useContext(ScreenNotificationContext);
    
    const params = useParams();
    const navigate = useNavigate();
    const acceptedUserType = ["student", "organizer"];

    useEffect(() => {
        //console.log(params);
        if (!params.userType) navigate("/login/student");
        else if (!acceptedUserType.includes(params.userType)) navigate("/error");
        setRegisterStatus(0);
    }, [params])


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registerStatus, setRegisterStatus] = useState(0);
    const [organization, setOrganization] = useState(""); //optional for organizers
    const [errMsg, setErrMsg] = useState("");
    const [carrier, setCarrier] = useState("");

    const register = async (event) => {
        event.preventDefault();
        const response = await handleRegister(params.userType, getIdPrefix(params)+userName, password, firstName, lastName, email, phoneNumber, organization,carrier);
        //console.log("register result", response);
        setRegisterStatus(response.status);
        setErrMsg(response.msg);
        notifyUser(response.msg);
    }

    useEffect(() => {
        if (registerStatus === 201) {
            setTimeout(() => {
                //console.log("nav login");
                navigate("/login");  
            },3000);  
        }
    },[registerStatus])

    //Same base as login page
    return (
        <div className="login-main-content">
            <Link to="/" className="btn-back-home">{"< Home"}</Link>
            <div className="login-box">
                
                <RegisterUserTypeSelector params={params} route={"/register"}/>
                
                <div className="form-container">

                  <FormStatusMsg status={registerStatus} msg={errMsg}/>

                    <h2>Create an account</h2>

                    <form id="loginForm" onSubmit={register}>
                        <UserIdInput userName={userName} setUserName={setUserName}/>

                        {params.userType === "organizer" ? 
                            <div className="form-group">
                            <label className="form-label" htmlFor="firstName">Organization</label>
                            <input type="text" id="organization" className="form-input" required 
                                value={organization} onChange={e => setOrganization(e.target.value)}/>
                            </div>:""
                        }

                        <div className="form-group">
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" className="form-input" required 
                            value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" className="form-input" required 
                            value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-input" required 
                            value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" className="form-input" placeholder="10-digit Canadian number" required 
                            value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="carrier">Phone Carrier</label>
                        <select 
                         id="carrier" 
                         className="form-input" 
                         required
                         value={carrier} 
                         onChange={e => setCarrier(e.target.value)}
                      >
                        <option value="">Select your carrier</option>
                        <option value="bell">Bell</option>
                        <option value="rogers">Rogers</option>
                        <option value="telus">Telus</option>
                        <option value="fido">Fido</option>
                        <option value="videotron">Videotron</option>
                        <option value="koodo">Koodo</option>
                        </select>
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-input" 
                            value={password} onChange={e => setPassword(e.target.value)} required/>
                        </div>

                        <button className="btn-primary" type="submit">
                            Register
                        </button>
                    </form>                       

                    <p className="register-text">Have an account? 
                        <Link to="/login/student" className="register-link"> Login</Link>
                    </p>
                </div>
            </div>
        <Footer/>
        </div>
    )
}