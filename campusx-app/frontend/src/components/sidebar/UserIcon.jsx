import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import { FaUserAlt } from "react-icons/fa";

export default function UserIcon() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    if (currentUser)
    return(
        <div className="user-icon">
            <FaUserAlt id="user-icon"/>
            <div className="user-info">
                <p id="name">{String(currentUser.firstName).toUpperCase()}</p>
                <p id="user-id">{currentUser.userId}</p>
                <p id="role">{String(currentUser.type).toUpperCase()}</p>
                {currentUser.type === "organizer" ? 
                    <>
                    <p id="organization">{String(currentUser.organization).toUpperCase()}</p>
                    <p id={"status"+(currentUser.isApproved? "-approved":"-unapproved")}>
                        Status: {currentUser.isApproved ? "Approved":"Not Approved"}</p>
                    </>
                    :""}
            </div>
        </div>
    )
}