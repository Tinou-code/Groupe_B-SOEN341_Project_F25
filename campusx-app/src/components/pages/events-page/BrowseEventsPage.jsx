import HeroBanner from "../home-page/HeroBanner"
import Sidebar from "../../sidebar/Sidebar"
import Footer from "../../footer/Footer"
import EventCard from "./EventCard"

import { events } from "../../../../api/events"
import "./eventsPage.css"

//Event page - display event components

export default function BrowseEventsPage() {
    return(
       <div className="page-container">
           <Sidebar/>
           <div className="main-content">
                <HeroBanner/>
               <div className="events-container">
                {events.map(event => <EventCard key={event.id} ev={event} />)}
               </div>
               <Footer/>
           </div>
       </div>
    )
}