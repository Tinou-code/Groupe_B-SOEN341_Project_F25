import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAccessMsg from "../../../error-page/noAccessMsg";
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import { getEvents } from "../../../../../../api/events";
import "./orgDashboard.css"


export default function OrgDashboard() {

    const {notifyUser} = useContext(ScreenNotificationContext);

    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();
    const [selectEvent, setSelectEvent] = useState();
    
    //fetch events from database when component mounts and/or when user saves/claims a ticket
    useEffect(() => {
        async function fetchEvents() {
            const response = await getEvents();
            console.log("fetchevents", response); 
            setEvents(e => response.events);
        }
        fetchEvents()   
    }, []);

    return(
        <div className="page-container">
            <Sidebar/>

            <div className="main-content">              
                
                <div className="page-header"><h3>{currentUser?.organization} Dashboard<br/>
                </h3></div>
                
            {currentUser && currentUser?.isLoggedIn && currentUser?.type === "organizer" && currentUser.isApproved ? 
                
         
            <div className="dashboard-container">
                <select id="event-select" 
                onChange={e => setSelectEvent(s => events.find(event => event.eventId === e.target.value))}>
                    <option value="">Select an event</option>
                    {events?.filter(e => e.organizer === currentUser.organization).sort((a,b) => a.title - b.title).map(c => (
                        <option key={c.eventId} value={c.eventId}>{c.title}</option>
                    ))}
                </select>
                <br/>
                <h2 id="EventName"></h2>
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
            </div>
           

            : <NoAccessMsg/>}
                
                <Footer/>
            </div>
        </div>
    )
}