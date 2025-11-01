import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAccessMsg from "../../../error-page/noAccessMsg";
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import { getEvents } from "../../../../../../api/events";
import "./orgDashboard.css"
import { getUser } from "../../../../../../api/users";
import{ CSVLink } from "react-csv";


export default function OrgDashboard() {

    const {notifyUser} = useContext(ScreenNotificationContext);

    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();
    const [selectEvent, setSelectEvent] = useState();
    const [guests, setGuests] = useState();
    
    //fetch events from database when component mounts and/or when user saves/claims a ticket
    useEffect(() => {
        async function fetchEvents() {
            const response = await getEvents();
            //console.log("fetchevents", response); 
            setEvents(e => response.events.filter(e => e.organizer === currentUser.organization));
        }
        fetchEvents()   
    }, []);

    useEffect(() => {
        if (!selectEvent) return
        async function fetchGuests() {
            const guestList = await Promise.all(
                selectEvent.guestList.map(async g => {
                    //console.log("guest", g.studentId);
                    const response = await getUser(g.studentId);
                    return response.user;
            }));
            //console.log("guest list", guestList);
            let data = []
            guestList.map(g => data.push({
                studentId:g.userId, 
                lastName:g.lastName, 
                firstName:g.firstName, 
                email:g.email, 
                phoneNumber:g.phoneNumber, 
                ticketNum:g.claimedTickets.filter(t => t.eventId === selectEvent.eventId)[0]?.ticketId}))
            setGuests(g => data.sort((a,b) => a.studentId.localeCompare(b.studentId)));
        }
        fetchGuests()
    },[selectEvent]);

    const csvHeaders = [
        {label: "Student ID", key:"studentId"},
        {label: "Last Name", key:"lastName"},
        {label: "First Name", key:"firstName"},
        {label: "Email", key:"email"},
        {label: "Phone Number", key:"phoneNumber"},
        {label: "Ticket Number", key:"ticketNum"},
    ];

    return(
        <div className="page-container">
            <Sidebar/>

            <div className="main-content">              
                
                <div className="page-header"><h3>{currentUser?.organization} Dashboard<br/>
                </h3></div>
                
            {currentUser && currentUser?.isLoggedIn && currentUser?.type === "organizer" && currentUser.isApproved ? 
                
         
            <div className="dashboard-container">
                <select id="event-select" 
                    onChange={e => {
                    const eventId = e.target.value;
                    if (eventId === "") {
                        setSelectEvent(undefined);
                        setGuests(undefined);
                    }
                    else setSelectEvent(s => events.find(event => event.eventId === e.target.value))}}>
                    
                    <option value="">Select an event</option>
                    {events?.sort((a,b) => a.title.localeCompare(b.title)).map(c => (
                        <option key={c.eventId} value={c.eventId}>{c.title}</option>
                    ))}
                </select>
                <br/>
                <table id="event-table">
                    <tbody>
                        {selectEvent ? 
                        <>
                        <tr>
                            <td colSpan="2" className="table-head">{`${selectEvent.title} - ${selectEvent.eventId}`}</td>
                        </tr>
                        <tr><td className="data-title">Date</td><td>{selectEvent.date}</td></tr>
                        <tr><td className="data-title">Capacity</td><td>{selectEvent.tickets}</td></tr>
                        <tr><td className="data-title">Tickets Issued</td><td>{Number(selectEvent.tickets) - Number(selectEvent.remainingTickets)}</td></tr>
                        <tr><td className="data-title">Remaining Capacity</td><td>{Number(selectEvent.remainingTickets)}</td></tr>
                        <tr>
                            <td className="data-title">Checked-In</td>
                            <td>{new Date(selectEvent.date) < new Date() ? selectEvent.attendees.length : <i>This data is unavailable for the moment</i>}</td>
                        </tr>
                        <tr>
                            <td className="data-title">Attendance Rate</td>
                            <td>{new Date(selectEvent.date) < new Date() ? `${100*(Number(selectEvent.attendees.length)/Number(Number(selectEvent.tickets) - Number(selectEvent.remainingTickets)))}%` 
                            : <i>This data is unavailable for the moment</i>}</td>
                            </tr>
                        </>
                        :
                        <tr>
                            <td colSpan="2">Please select an event.</td>
                        </tr>}
                    </tbody>
                </table>

                <table id="guest-table">
                    <tbody>
                        {guests && selectEvent ? 
                        <>
                        <tr>
                            <td colSpan="5" className="table-head">
                            <div className="table-header">
                                <span>{`Guest List - ${selectEvent.title} - ${selectEvent.eventId}`}</span>
                                {guests?
                                    <CSVLink className="export-button" data={guests? guests:""} headers={csvHeaders} filename={`${selectEvent.eventId}-guestList.csv`}>
                                        Export CSV</CSVLink>
                                    :""}
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="data-title">ID</td>
                            <td className="data-title">Name</td>
                            <td className="data-title">Email</td>
                            <td className="data-title">Phone Number</td>
                            <td className="data-title">Ticket Number</td>
                        </tr>
                        
                       { guests?.map(g => 
                            <tr key={g.studentId}>
                                <td className="guest-data">{g.studentId}</td>
                                <td className="guest-data">{`${g.lastName}, ${g.firstName}`}</td>
                                <td className="guest-data">{g.email}</td>
                                <td className="guest-data">{g.phoneNumber}</td>
                                <td className="guest-data">{g.ticketNum}</td>
                            </tr>
                        )}
                        </>
                        :
                        <tr>
                            <td colSpan="2"><i>No guests</i></td>
                        </tr>}
                    </tbody>
                </table>
                
            </div>
           
            : <NoAccessMsg/>}
                
                <Footer/>
            </div>
        </div>
    )
}