//component to dispay message when user tries to access certain pages while logged out

import { Link } from "react-router-dom";

export default function NoAccessMsg() {
    return(
        <div className="content-paragraphs">
                <p>You need to <Link to="/login/student">login</Link> to access to this content</p>
        </div>
    )
}