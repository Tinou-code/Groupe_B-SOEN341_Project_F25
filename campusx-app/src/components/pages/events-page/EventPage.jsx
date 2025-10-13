import { useParams } from "react-router-dom"
import { events } from "../../../../api/events";
import { formatDate, formatTime } from "../../../../api/events";
import { CurrentUserContext } from "../../../App";
import { useContext, useEffect } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";

export default function EventPage() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const params = useParams();
    const eventId = params.eventId;
    const ev = events.find(e => e.id === Number(eventId));
    console.log(currentUser);

      //save event locally, does not write to db yet
      function saveEvent() {
        setCurrentUser(u => u = {...u, savedEvents:[...u.savedEvents, ev]});
        console.log(currentUser);
      }
    
      function unsaveEvent() {
        setCurrentUser(u => u = {...u, savedEvents:u.savedEvents.filter(e => e.id != ev.id)})
      }
    
      useEffect(() => {
        sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));
      }, [currentUser])

    return(
        <div className="page-container">
            <Sidebar/>
        <div className="event-page">
            <img src={ev.image} alt={ev.title} className="event-image" />
            <div className="event-content">
            <span className="event-category">{ev.category} - ID: {ev.id}</span>
            <h2 className="event-title">{ev.title}</h2>
            <div className="event-details">
                <div className="event-detail"><span>{formatDate(ev.date)}</span></div>
                <div className="event-detail"><span>{formatTime(ev.time)}</span></div>
                <div className="event-detail"><span>{ev.location}</span></div>
            </div>
            <div className="event-footer">
                <span className="event-organizer">by {ev.organizer}</span>
            </div>
            <div className="user-options">
                {!currentUser.savedEvents?.find(e => Number(e.id) === ev.id) ?
                    <button onClick={() => saveEvent()}>Save Event</button>
                    :<button onClick={() => unsaveEvent()}>Unsave Event</button>}
            </div>
            </div>
            <Footer/>
        </div>
        </div>
    )
}