
import Sidebar from "../../sidebar/Sidebar"
import Footer from "../../footer/Footer"
import EventCard from "./EventCard"

import "./eventsPage.css"
import { CurrentUserContext } from "../../../App"
import { useContext, useEffect, useState } from "react"
import NoAccessMsg from "../../noAccessMsg"
import { getEvents } from "../../../../../api/events"

//Event page - display event components
export default function BrowseEventsPage() {
    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();
    const [search, setSearch] = useState("");
    const [searchDate, setSearchDate] = useState(new Date());

    //handle user search
    function handleSearch(events) {
        let filteredEvents;
        let searchStr = search.toLowerCase();
        if (!search) filteredEvents = events;
        else filteredEvents = events.filter(e => 
            String(e.title).toLowerCase().includes(searchStr) || 
            String(e.category).toLowerCase().includes(searchStr) ||
            String(e.location).toLowerCase().includes(searchStr) ||
            String(e.organizer).toLowerCase().includes(searchStr));
        if (searchDate) filteredEvents = filteredEvents.filter(e => new Date(e.date) >= new Date(searchDate));
        return filteredEvents.sort((a,b) => new Date(a.date) - new Date(b.date));
    }


    //fetch events from database when component mounts and/or when user saves/claims a ticket
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
               
                <div>
                    <div class="search-container">
                    <input
                    type="text"
                    id="eventSearch"
                    className="search-input"
                    value={search}
                    onChange={e => setSearch(s => e.target.value)}
                    placeholder="Search by title, category, or location..."
                    />
                    <div className="search-date">
                    <input type="date" value={searchDate} defaultValue={new Date()} onChange={e => {setSearchDate(d => e.target.value); console.log("date", e.target.value)}}/>
                    </div>
                    </div>

                    <div className="events-container">
                    {events? handleSearch(events).map(event => <EventCard key={event.eventId} ev={event} />):"No Events Found"}
                    </div>
                </div>:
                <NoAccessMsg/>}

               <Footer/>
           </div>
       </div>
    )
}