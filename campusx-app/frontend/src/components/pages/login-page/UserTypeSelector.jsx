import { Link } from "react-router-dom"

export function LoginUserTypeSelector({params, route}) {

    return(
            <div className="login-box-header">
                        <Link className={"user-type-box" + (Object.entries(params).length === 0 | params.userType === "student" ? "-active":"")}
                            to={`${route}/student`}>Student</Link>
                        <Link className={"user-type-box" + (params.userType === "organizer" ? "-active":"")} 
                            to={`${route}/organizer`}>Organizer</Link>
                        <Link className={"user-type-box"+ (params.userType === "admin" ? "-active":"")} 
                            to={`${route}/admin`}>Administrator</Link>
            </div>
    )
}

export function RegisterUserTypeSelector({params, route}) {

    return(
            <div className="register-box-header">
                        <Link className={"user-type-box" + (Object.entries(params).length === 0 | params.userType === "student" ? "-active":"")}
                            to={`${route}/student`}>Student</Link>
                        <Link className={"user-type-box" + (params.userType === "organizer" ? "-active":"")} 
                            to={`${route}/organizer`}>Organizer</Link>
            </div>
    )
}