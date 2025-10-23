import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../../../../App"
import Sidebar from "../../../sidebar/Sidebar"
import Footer from "../../../footer/Footer"
import EventCard from "../../events-page/EventCard"
import NoAcessMsg from "../../../error-page/noAccessMsg"
import { getEvent } from "../../../../../../api/events"



export default function SavedEventsPage() {

    const {currentUser} = useContext(CurrentUserContext)
    const [events, setEvents] = useState(); 

    useEffect(() => {

        async function fetchEvents() {

            if (!currentUser) return;

            const eventList = await Promise.all(
                currentUser?.savedEvents.map(async id => {
                    const response = await getEvent(id);
                    return response.event;
            }))

            //console.log("event list", eventList);

            setEvents(e => eventList);
        }

        fetchEvents()

    },[currentUser])
    

    return(

    <div className="page-container">
        <Sidebar/>
        <div className="main-content">              
            
            <div className="page-header"><h3>My Saved Events</h3></div>
            {currentUser && currentUser?.isLoggedIn && currentUser?.type === "student" ? 
            <div className="events-container">
            {   !currentUser?.savedEvents | currentUser?.savedEvents?.length === 0 ? 
                <div className="content-paragraphs">
                    <p>You have not saved events yet</p>
                </div>:
                events?.map(event => <EventCard key={event.eventId} ev={event} />)
            }
            </div> : <NoAcessMsg/>}
            
            <Footer/>
        </div>
    </div>

    )
}