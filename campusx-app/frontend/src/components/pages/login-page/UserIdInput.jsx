/*
this component automatically assigns the 
first character of the user ID input when loggin in 
or signing up depending on the page url
*/

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function getIdPrefix(params) {
        switch(params.userType) {
            case "student": return("S"); 
            case "organizer": return("O"); 
            case "admin": return("A"); 
            default: return("S");
        }
    }

export default function UserIdInput({userName, setUserName}) {
    const params = useParams();
    useEffect(() => {
        setIdPrefix(getIdPrefix(params))
    }, [params])

    const [idPrefix, setIdPrefix] = useState(getIdPrefix(params));

    return(
            <div className="form-group">
                <label className="form-label" htmlFor="username">
                    {Object.entries(params).length === 0 || params.userType === "student" ? "Student":null}
                    {params.userType === "organizer" ? "Organizer":null}
                    {params.userType === "admin" ? "Admin":null} ID
                </label>
            
                <div className="id-input-container">
                    <input className="id-prefix" value={idPrefix} onChange={e => setIdPrefix(e.target.value)} readOnly={true}/>
                    <input type="text" id="username" className="form-input" 
                        value={userName} onChange={e => setUserName(e.target.value)} required/>
                </div>
            </div>
    )
}