import Footer from "../../../footer/Footer"
import Sidebar from "../../../sidebar/Sidebar"
import NoAccessMsg from "../../../error-page/noAccessMsg"
import { useState, useEffect, useContext } from "react"
import { getOrganizations } from "../../../../../../api/admin"
import { CurrentUserContext } from "../../../../App"
import { Link, Outlet, useNavigate } from "react-router-dom"
import "./manageOrg.css"

export default function ManageOrgPage() {

    const {currentUser} = useContext(CurrentUserContext);
    const [organizations, setOrganizations] = useState();
    const [org, setOrg] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrgs() {
            const response = await getOrganizations();
            //console.log("response2", response.organizations); 
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
                    <div className="org-container">
                    {organizations?
                    <select className="org-list" onChange={e => {
                        const value = e.target.value;
                        if (value === "") {
                            setOrg(o => undefined);
                            navigate("/admin/organizers");
                        }
                        else {
                            setOrg(o => value)
                            navigate(`/admin/organizers/${value}`);
                        }
                    }}>
                        <option value="">Select an organization</option>
                        {organizations?.sort((a,b) => a.name.localeCompare(b.name)).map(org => 
                            <option key={org.id} value={org.id} className="org-card">{`${org.name} - ${org.id}`}</option>)}
                    </select>
                    :"No data found"}
                    </div>
                    {org ? <Outlet/>
                        :<div className="content-paragraphs">
                            <p>Select an organization to manage</p>
                        </div>}
                </div>:
                <NoAccessMsg/>}

                <Footer/>
            </div>
        </div>
    )
}