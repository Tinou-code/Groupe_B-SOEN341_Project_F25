import Footer from "../../../footer/Footer"
import Sidebar from "../../../sidebar/Sidebar"
import NoAccessMsg from "../../../error-page/noAccessMsg"
import { useState, useEffect, useContext } from "react"
import { getMembers, getOrganizations, handleApproveAccount, handleDisableAccount } from "../../../../../../api/admin"
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App"
import { Link, useParams } from "react-router-dom"
import { getEvents } from "../../../../../../api/events"
import EventCard from "../../events-page/EventCard"
import "./manageOrg.css"

export default function OrganizationPage() {

    const params = useParams();

    const {currentUser} = useContext(CurrentUserContext);
    const {notifyUser} = useContext(ScreenNotificationContext);
    const [members, setMembers] = useState();
    const [events, setEvents] = useState();


    useEffect(() => {
        async function fetchMembers() {
            const response = await getMembers(params.organization);
            //console.log("members", response.members); 
            setMembers(m => [...response.members].sort((a,b) => a.lastName - b.lastName));
        }
        async function fetchOrgEvents() {
            const response = await getEvents();
            //console.log("events", response.events.filter(e => e.organizer === params.organization)); 
            setEvents(m => response.events.filter(e => e.organizer === params.organization));
        }
        fetchMembers();
        fetchOrgEvents();   
    }, []);

    async function approveAccountr(userId) {
        const approve = await handleApproveAccount(userId);
        notifyUser(approve.msg);
        if (approve.status === 201) {
            const response = await getMembers(params.organization); 
            setMembers(m => [...response.members].sort((a,b) => a.lastName - b.lastName));
        } 
    }

     async function disableAccount(userId) {
        const approve = await handleDisableAccount(userId);
        notifyUser(approve.msg);
        if (approve.status === 201) {
            const response = await getMembers(params.organization); 
            setMembers(m => [...response.members].sort((a,b) => a.lastName - b.lastName));
        } 
    }

    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">
                <div className="page-header"><h2>Manage Organizations</h2></div>
                
                {currentUser?
                               
                <div>
                    <div className="members-container">
                    <h5>{params.organization} Members</h5>
                    {members ?
                    <table className="org-members">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Account Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                         {members?.map(m => 
                            <tr key={m.userId}>
                                <td>{m.userId}</td>
                                <td>{`${m.lastName}, ${m.firstName}`}</td>
                                <td><i>n/a</i></td>
                                <td ><span className={"status" + (m.isApproved ? "-approved":"-unapproved")}>{m.isApproved ? "Approved":"Not Approved"}</span></td>
                                <td className="action"> {m.isApproved ? 
                                    <button className="disable-account" onClick={() => disableAccount(m.userId)}>Disable User Account</button>
                                    :<button className="approve-account" onClick={() => approveAccountr(m.userId)}>Approve User Account</button>} </td>
                            </tr>
                         )}
                        </tbody>
                     </table> : "No members found"}
                    </div>

                    <h5>Events by {params.organization}</h5>
                    <div className="events-container">
                        {events? events?.map(ev => <EventCard key={ev.eventId} ev={ev} />):"No Events Found"}
                    </div>

                </div>:
                <NoAccessMsg/>}

                <Footer/>
            </div>
        </div>
    )
}