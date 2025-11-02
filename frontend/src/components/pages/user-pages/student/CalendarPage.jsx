
import moment from "moment";
import { CurrentUserContext } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAccessMsg from "../../../error-page/noAccessMsg";

import { formatDate, getEvent } from "../../../../../../api/events";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendarPage.css";
import { Link } from "react-router-dom";


export default function CalendarPage() {

    const {currentUser} = useContext(CurrentUserContext);

        const claimedTickets= currentUser?.claimedTickets;
        const [events, setEvents] = useState([]); 
    
        useEffect(() => {
    
            async function fetchEvents() {
    
                if (!currentUser) return;
    
                const eventList = await Promise.all(
                    claimedTickets.map(async ticket => {
                        const response = await getEvent(ticket.eventId);
                        let event = response.event
                        let start = moment(`${event.date}T${event.time}`).toDate();
                        let end = moment(`${event.date}T${event.time}`).add(2, "hour").toDate();
                        let listItem = {title: event.title, start, end, eventId: event.eventId, location: event.location};
                        //console.log("listItem", listItem)
                        return listItem;
                }))
    
                //console.log("event list", eventList);
    
                setEvents(e => eventList);
            }
    
            fetchEvents()
    
        },[])


    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">              
                
                <div className="page-header"><h3>My Calendar</h3></div>
                {currentUser && currentUser?.isLoggedIn && currentUser?.type === "student" ? 
                <div className="my-events-container">
                {   !currentUser?.claimedTickets | currentUser?.claimedTickets?.length === 0 ? 
                    <div className="content-paragraphs">
                        <p>You have no claimed tickets. 
                            When you claim a ticket, the event will appear on your calendar.</p>
                    </div>:
                    <div className="reservations-container">
                        <div className="calendar-container" style={{height: "60vh"}}>
                                <FullCalendar  plugins={[ dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    weekends={true}
                                    events={events}
                                    headerToolbar={
                                        {center:"today prev,next", start:"title", end:"dayGridMonth, dayGridWeek, dayGridDay"}
                                    }
                                    height={"60vh"}/>
                        </div>
                        <div className="upcoming-event-list">
                            <h4>My upcoming events</h4>
                            <ul>
                                {events?.filter(e => new Date(e.start) >= new Date()).sort((a,b) => new Date(a.start) - new Date(b.start)).map(e => (
                                    <Link key={e.eventId} className="link" to={`/events/${e.eventId}`}>
                                    <li className="event-list-item">
                                        <span className="title">{formatDate(e.start)}</span>
                                        <br/><span>{e.title}</span>
                                        <br/><span className="location ">{e.location}</span>  
                                    </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                </div> : <NoAccessMsg/>}
                
                <Footer/>
            </div>
        </div>
    )
}