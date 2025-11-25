import NoAccessMsg from "../../../error-page/noAccessMsg"
import { useState, useEffect, useContext } from "react"
import { getMembers, getOrganization, handleApproveAccount, handleAproveEvent, handleDisableAccount, handleRoleUpdt } from "../../../../../../api/admin"
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App"
import { useParams } from "react-router-dom"
import { getEvents } from "../../../../../../api/events"
import "./manage-org.css"

export default function OrganizationPage() {

    const params = useParams();

    const {currentUser} = useContext(CurrentUserContext);
    const {notifyUser} = useContext(ScreenNotificationContext);
    const [members, setMembers] = useState();
    const [events, setEvents] = useState();
    const [organization, setOrganization] = useState();
    const roles = ["organizer", "owner", "staff"];

    useEffect(() => {
        async function fetchOrg() {
             const response = await getOrganization(params.organization);
            //console.log("members", response.members); 
            if (response.status === 200) setOrganization(response.organization);
        }
        async function fetchMembers() {
            const response = await getMembers(params.organization);
            //console.log("members", response);
            let members = sortMembers(response.members);
            if (members.length === 0) setMembers(undefined);
            else setMembers(members);
        }
        fetchOrg();
        fetchMembers();   
    }, [params]);

    useEffect(() => {
        async function fetchOrgEvents() {
            const response = await getEvents();
            //console.log("events", response.events.filter(e => e.organizer === params.organization)); 
            let events = response.events.filter(e => e.organizer === organization?.name);
            if (events.length === 0) setEvents(undefined); 
            else setEvents(events);
        }
        fetchOrgEvents();
    }, [organization]);

    async function approveAccount(userId) {
        const approve = await handleApproveAccount(userId);
        notifyUser(approve.msg);
        if (approve.status === 201) {
            const response = await getMembers(params.organization); 
            setMembers(sortMembers(response.members));
        } 
    }

    async function disableAccount(userId) {
        const approve = await handleDisableAccount(userId);
        notifyUser(approve.msg);
        if (approve.status === 201) {
            const response = await getMembers(params.organization); 
            setMembers(sortMembers(response.members));
        } 
    }

    async function roleUpdt(userId, role) {
        const update = await handleRoleUpdt(userId, role);
        notifyUser(update.msg);
        if (update.status === 201) {
            const response = await getMembers(params.organization); 
            setMembers(sortMembers(response.members));
        } 
    }

    async function approveEvent(eventId, isApproved) {
        const approve = await handleAproveEvent(eventId, isApproved);
        //console.log("claim ticket res", response);
        notifyUser(approve.msg);
        if (approve.status === 201) {
            const response = await getEvents();
            let events = response.events.filter(e => e.organizer === organization?.name);
            if (events.length === 0) setEvents(undefined); 
            else setEvents(events);
        }
    }

    function sortMembers(members) {
        let arr = members.sort((a,b) => a.lastName.localeCompare(b.lastName));
        let i = arr.findIndex(e => e.role === "owner");
        if (i !== -1) {
            let owner = arr.splice(i,1)[0];
            arr.unshift(owner);
        }
        return arr;
    }

    return(   
        currentUser && organization ?
                        
        <div>
            <div className="org-container">
            <span className="table-title">{organization.name} Members</span>
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
                        <td>
                            <select onChange={e => roleUpdt(m.userId, e.target.value)}>
                                <option value={m.role}>{m.role}</option>
                                {roles.filter(r => r !== m.role).map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <span className="action">
                            <span className={"status" + (m.isApproved ? "-approved":"-unapproved")}>{m.isApproved ? "Approved":"Not Approved"}</span>
                            </span>
                        </td>
                        <td> 
                            <span className="action">{m.isApproved ? 
                            <button className="disable-account" onClick={() => disableAccount(m.userId)}>Disable User Account</button>
                            :<button className="approve-account" onClick={() => approveAccount(m.userId)}>Approve User Account</button>} 
                            </span>
                        </td>
                    </tr>
                    )}
                </tbody>
                </table> : <div className="content-paragraphs">
                            <p>No members found</p>
                            </div>}
            </div>
            
            <div className="org-container">
            <span className="table-title">Events by {organization.name}</span>
            
            {events ?
            <table className="org-members">
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Remaining Tickets</th>
                        <th>Event Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events?.sort((a,b) => a.title.localeCompare(b.title)).map(e => 
                    <tr key={e.eventId}>
                        <td>{e.eventId}</td>
                        <td>{e.title}</td>
                        <td>{e.date}</td>
                        <td>{e.location}</td>
                        <td>{e.tickets}</td>
                        <td>{e.remainingTickets}</td>
                        <td>
                            <span className="action">
                            <span className={"status" + (e.isApproved ? "-approved":"-unapproved")}>{e.isApproved ? "Approved":"Not Approved"}</span>
                            </span>
                        </td>
                        <td> 
                            <span className="action">{e.isApproved ? 
                            <button className="disable-account" onClick={() => approveEvent(e.eventId, false)}>Suspend Event</button>
                            :<button className="approve-account" onClick={() => approveEvent(e.eventId, true)}>Approve Event</button>} 
                            </span>
                        </td>
                    </tr>
                    )}
                </tbody>
                </table> : <div className="content-paragraphs">
                            <p>No events found</p>
                            </div>}
            </div>

        </div>:
        <NoAccessMsg/>
    )
}

    /*return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">
                <div className="page-header"><h2>Manage Organizations</h2></div>
                
                {currentUser && organization ?
                               
                <div>
                    <div className="members-container">
                    <h5>{organization.name} Members</h5>
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

                    <h5>Events by {organization.name}</h5>
                    <div className="events-container">
                        {events? events?.map(ev => <EventCard key={ev.eventId} ev={ev} />):"No Events Found"}
                    </div>

                </div>:
                <NoAccessMsg/>}

                <Footer/>
            </div>
        </div>
    )*/