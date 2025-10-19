
import Sidebar from "../../sidebar/Sidebar"
import Footer from "../../footer/Footer"
import EventCard from "./EventCard"

import "./eventsPage.css"
import { CurrentUserContext } from "../../../App"
import { useContext, useEffect, useState } from "react"
import NoAccessMsg from "../noAccessMsg"
import { getEvents } from "../../../../../api/events"

//Event page - display event components
export default function BrowseEventsPage() {
    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();

    useEffect(() => {
        async function fetchEvents() {
            const response = await getEvents();
            console.log("response2", response); 
            setEvents(e => response.events);
        }
        fetchEvents()   
    }, [currentUser])

    return(
       <div className="page-container">
           <Sidebar/>
           <div className="main-content">
                <div className="page-header"><h2>Upcoming Events</h2></div>
               
                {currentUser?
                <div className="events-container">
                {events? events.map(event => <EventCard key={event.eventId} ev={event} />):"No Events Found"}
                </div>:
                <NoAccessMsg/>}

               <Footer/>
           </div>
       </div>
    )
}