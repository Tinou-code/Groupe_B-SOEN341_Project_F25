import Footer from "../../../footer/Footer"
import Sidebar from "../../../sidebar/Sidebar"
import NoAccessMsg from "../../../error-page/noAccessMsg"
import { useState, useEffect, useContext } from "react"
import { getOrganizations } from "../../../../../../api/admin"
import { CurrentUserContext } from "../../../../App"
import { Link } from "react-router-dom"

export default function ManageOrgPage() {

    const {currentUser} = useContext(CurrentUserContext);
    const [organizations, setOrganizations] = useState();


    useEffect(() => {
        async function fetchOrgs() {
            const response = await getOrganizations();
            //console.log("response2", response.events.filter(e => e.organizer === currentUser?.organization)); 
            setOrganizations(e => [...response.organizations].sort());
        }
        fetchOrgs()   
    }, []);

    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">
                <div className="page-header"><h2>Manage Organizations</h2></div>
                
                {currentUser?
                               
                <div>
                    <div className="events-container">
                        <h5>Organizations</h5>
                    <ul className="org-list">
                    {organizations? organizations?.map(org => 
                        <Link to={`/admin/organizers/${org}`}><li key={org} className="org-card"> {org} </li></Link>):"No data found"}
                    </ul>
                    </div>
                </div>:
                <NoAccessMsg/>}

                <Footer/>
            </div>
        </div>
    )
}