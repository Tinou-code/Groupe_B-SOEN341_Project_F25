
import moment from "moment";
import { CurrentUserContext } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAcessMsg from "../../noAccessMsg";

import { getEvent } from "../../../../../../api/events";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendarPage.css";


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
                        let listItem = {title: event.title, start, end};
                        console.log("listItem", listItem)
                        return listItem;
                }))
    
                console.log("event list", eventList);
    
                setEvents(e => eventList);
            }
    
            fetchEvents()
    
        },[])


    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">              
                
                <div className="page-header"><h3>My Saved Events</h3></div>
                {currentUser && currentUser.isLoggedIn && currentUser.type === "student" ? 
                <div className="events-container">
                {   !currentUser.savedEvents | currentUser?.savedEvents?.length === 0 ? 
                    <div className="content-paragraphs">
                        <p>You have not saved events yet</p>
                    </div>:
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
                }
                </div> : <NoAcessMsg/>}
                
                <Footer/>
            </div>
        </div>
    )
}