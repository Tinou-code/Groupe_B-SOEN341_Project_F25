import { useContext, useEffect } from "react"
import { formatDate, formatTime, handleCancelTicket, handleClaimTicket, handleSaveEvent, handleUnsaveEvent } from "../../../../../api/events"
import { CurrentUserContext, ScreenNotificationContext } from "../../../App"
import { Link } from "react-router-dom";
import { useState } from "react";

//Event component
export default function Event({ev}) {

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const {notifyUser} = useContext(ScreenNotificationContext);
  

  async function saveEvent() {
    const response = await handleSaveEvent(currentUser.userId, ev.eventId);
    console.log("save event res", response);
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  async function unsaveEvent() {
    const response = await handleUnsaveEvent(currentUser.userId, ev.eventId);
    console.log("unsave event res", response);
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  async function claimTicket() {
    const response = await handleClaimTicket(currentUser.userId, ev.eventId);
    console.log("claim ticket res", response);
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  async function unclaimTicket() {
     const response = await handleCancelTicket(currentUser.userId, ev.eventId);
    console.log("claim ticket res", response);
    setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
    notifyUser(response.msg);
  }

  useEffect(() => {
    sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));
  }, [currentUser])

    return(
      <div className="event-card">
        <Link to={`/events/${ev.eventId}`} className="event-card-link">
          <img src={ev.imagePath} alt={ev.title} className="event-image" />
          <div className="event-content">
            <div className="event-tags">
              <span className="event-tag">{ev.category}</span>
              <span className="event-tag">{ev.type}</span>
            </div>
            <h2 className="event-title">{ev.title}</h2>
            <span className="available-tickets">{`${ev.remainingTickets}/${ev.tickets}`} tickets remaining</span>
            <div className="event-details">
              <div className="event-detail"><span>{formatDate(ev.date)}</span></div>
              <div className="event-detail"><span>{formatTime(ev.time)}</span></div>
              <div className="event-detail"><span>{ev.location}</span></div>
            </div>
            <div className="event-footer">
              <span className="event-organizer">by {ev.organizer}</span>
            </div>
          </div>
        </Link>
        {currentUser.type === "student" ? 
          <div className="event-user-options">
              {!currentUser.savedEvents?.find(e => e === ev.eventId) ?
                <button className="save" onClick={() => {saveEvent()}}>Save Event</button>
                :<button className="unsave" onClick={() => {unsaveEvent()}}>Unsave Event</button>}
              
              {!currentUser.claimedTickets?.find(e => e.eventId === ev.eventId) ?
                <button className="claim" onClick={() => claimTicket()}>Claim a Ticket</button>
                :<button className="unclaim" onClick={() => unclaimTicket()}>Cancel Reservation</button>}
          </div>:""}
      </div>
    )
}