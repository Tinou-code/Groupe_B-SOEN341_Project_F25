import { useContext, useEffect } from "react"
import { formatDate, formatTime, handleCancelTicket, handleClaimTicket, handleSaveEvent, handleUnsaveEvent } from "../../../../../api/events"
import { CurrentUserContext, ScreenNotificationContext } from "../../../App"
import { Link } from "react-router-dom";
import { useState } from "react";
import img404 from "/event-placeholder.svg";

//Event component
export default function EventCard({event}) {

  const [ev, setEv] = useState(event);
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const {notifyUser} = useContext(ScreenNotificationContext);

  async function saveEvent() {
    const response = await handleSaveEvent(currentUser?.userId, event.eventId);
    //console.log("save event res", response);
    if (response.user)
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  async function unsaveEvent() {
    const response = await handleUnsaveEvent(currentUser?.userId, event.eventId);
    //console.log("unsave event res", response);
    if (response.user)
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  async function claimTicket() {
    const response = await handleClaimTicket(currentUser?.userId, event.eventId);
    //console.log("claim ticket res", response);
    if (response.user)
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  async function unclaimTicket() {
     const response = await handleCancelTicket(currentUser?.userId, event.eventId);
    //console.log("claim ticket res", response);
    if (response.user)
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  useEffect(() => {
    sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));
  }, [currentUser])

    return(
      ev ? 
      <div className="event-card">
        <Link to={`/events/${event.eventId}`} className="event-card-link">
          <img src={event.imagePath ? event.imagePath : img404} alt={event.title} 
            onError={e => {
              e.target.onerror = null
              e.target.src = img404}} className="event-image" />
          <div className="event-content">

            <div className="event-tags">
              <span className="event-tag">{event.category}</span>
              <span className="event-tag">{event.type}</span>
            </div>
            {currentUser.type === "admin" || (currentUser.type === "organizer" && currentUser.organization === ev.organizer) ? 
            <p id={"status"+(ev?.isApproved? "-approved":"-unapproved")}>
                        Status: {ev?.isApproved ? "Approved":"Not Approved"}</p>:""}

            <h2 className="event-title">{event.title}</h2>
            <span className="available-tickets">{`${event.remainingTickets}/${event.tickets}`} tickets remaining</span>
            <div className="event-details">
              <div className="event-detail"><span>{formatDate(event.date)}</span></div>
              <div className="event-detail"><span>{formatTime(event.time)}</span></div>
              <div className="event-detail"><span>{event.location}</span></div>
            </div>
            <div className="event-footer">
              <span className="event-organizer">by {event.organizer}</span>
            </div>
          </div>
        </Link>

        {currentUser?.type === "student" && new Date(event.date) >= new Date() ? 
          <div className="event-user-options">
              {!currentUser?.savedEvents?.find(e => e === event.eventId) ?
                <button className="save" onClick={() => {saveEvent()}}>Save Event</button>
                :<button className="unsave" onClick={() => {unsaveEvent()}}>Unsave Event</button>}
              
              {!currentUser?.claimedTickets?.find(e => e.eventId === event.eventId) ?
                <button className="claim" onClick={() => claimTicket()}>Claim a Ticket</button>
                :<button className="unclaim" onClick={() => unclaimTicket()}>Cancel Reservation</button>}
          </div>:""}
      </div> : ""
    )
}