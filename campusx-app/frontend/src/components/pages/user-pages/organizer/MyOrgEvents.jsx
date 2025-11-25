
import Sidebar from "../../../sidebar/Sidebar" 
import Footer from "../../../footer/Footer"
import EventCard from "../../events-page/EventCard"


import { CurrentUserContext } from "../../../../App" 
import { useContext, useEffect, useState } from "react"
import NoAccessMsg from "../../../error-page/noAccessMsg"
import { getEvents } from "../../../../../../api/events" 

//Event page - display event components
export default function MyOrgEvents() {
    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();

    //fetch events from database when component mounts and/or when user saves/claims a ticket
    useEffect(() => {
        async function fetchEvents() {
            const response = await getEvents();
            //console.log("response2", response.events.filter(e => e.organizer === currentUser?.organization)); 
            setEvents(response.events.filter(e => e.organizer === currentUser?.organization));
        }
        fetchEvents()   
    }, [currentUser]);

    return(
       <div className="page-container">
           <Sidebar/>
           <div className="main-content">
                <div className="page-header"><h2>Events by {currentUser?.organization} </h2></div>
                
                {currentUser?
               
                <div>
                    <div className="events-container">
                    {events? events?.map(event => <EventCard key={event.eventId} event={event} />):"No Events Found"}
                    </div>
                </div>:
                <NoAccessMsg/>}

               <Footer/>
           </div>
       </div>
    )
}