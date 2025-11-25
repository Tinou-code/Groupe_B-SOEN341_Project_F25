import { useParams } from "react-router-dom"
import { formatDate, formatTime, handleCancelTicket, handleClaimTicket, handleSaveEvent, handleUnsaveEvent } from "../../../../../api/events";
import { CurrentUserContext, ScreenNotificationContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";
import { getEvent } from "../../../../../api/events";
import NoAccessMsg from "../../error-page/noAccessMsg";
import { ErrorContext } from "../../../App"; 
import img404 from "/event-placeholder.svg";

export default function EventPage() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const {notifyUser} = useContext(ScreenNotificationContext);
    const {error, setError} = useContext(ErrorContext);
    const params = useParams();
    const eventId = params.eventId;

    const [ev, setEvent] = useState();
      
          useEffect(() => {
              async function fetchEvent() {
                  const response = await getEvent(eventId);
                  //console.log("get event res", response);
                  if (response.status !== 200) setError(response)
                  setEvent(response.event);
              }
              fetchEvent()   
          }, [currentUser])
    
          if (error) throw new Error(error.msg);

     async function saveEvent() {
       const response = await handleSaveEvent(currentUser?.userId, ev?.eventId);
       //console.log("save event res", response);
       if (response.user)
       setCurrentUser({...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     async function unsaveEvent() {
       const response = await handleUnsaveEvent(currentUser?.userId, ev?.eventId);
       //console.log("unsave event res", response);
       if (response.user)
       setCurrentUser({...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     async function claimTicket() {
       const response = await handleClaimTicket(currentUser?.userId, ev?.eventId);
       //console.log("claim ticket res", response);
       if (response.user)
       setCurrentUser({...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     async function unclaimTicket() {
        const response = await handleCancelTicket(currentUser?.userId, ev?.eventId);
       //console.log("claim ticket res", response);
       if (response.user)
       setCurrentUser({...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     useEffect(() => {
       if (currentUser) sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));
     }, [currentUser])

    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">

              {ev && currentUser && currentUser?.isLoggedIn ? <>
              <div className="page-header"><h2>{ev?.title}</h2></div>
              <div className="event-page">
                <img src={ev?.imagePath ? ev.imagePath : img404} alt={ev?.title} 
                            onError={e => {
                              e.target.onerror = null
                              e.target.src = img404}} className="event-image" />
                <div className="event-page-content">
                  <div className="event-tags">
                    <span className="event-tag">{ev?.category}</span>
                    <span className="event-tag">{ev?.type}</span>
                  </div>

                  {currentUser.type === "admin" || (currentUser.type === "organizer" && currentUser.organization === ev.organizer) ? 
                    <p id={"status"+(ev?.isApproved? "-approved":"-unapproved")}>
                        Status: {ev?.isApproved ? "Approved":"Not Approved"}</p>:""}

                  <h2 className="event-page-title">{ev?.title} <br/> ID: {ev?.eventId}</h2>
                  
                  <div className="event-desc"><p>{ev?.desc}</p></div>

                  <span className="available-tickets">{`${ev?.remainingTickets}/${ev?.tickets}`} tickets remaining</span>
                  
                    <div className="event-detail"><span>{formatDate(ev?.date)}</span></div>
                    <div className="event-detail"><span>{formatTime(ev?.time)}</span></div>
                    <div className="event-detail"><span>{ev?.location}</span></div>                 
                    <span className="event-organizer">Organized by {ev?.organizer}</span>

                  {currentUser?.type === "student" && new Date(ev.date) >= new Date() ? 
                  <div className="event-user-options">
                      {!currentUser?.savedEvents?.find(e => e === ev?.eventId) ?
                        <button className="save" onClick={() => {saveEvent()}}>Save Event</button>
                        :<button className="unsave" onClick={() => {unsaveEvent()}}>Unsave Event</button>}
                      
                      {!currentUser?.claimedTickets?.find(e => e.eventId === ev?.eventId) ?
                        <button className="claim" onClick={() => claimTicket()}>Claim a Ticket</button>
                        :<button className="unclaim" onClick={() => unclaimTicket()}>Cancel Reservation</button>}
                  </div>:""}

                    <span className="event-organizer">Date added: {new Date(ev?.dateAdded).toLocaleString()}</span>
                </div>
                </div>
                </>: <><div className="page-header"><h2>Event Page</h2></div><NoAccessMsg/></>}
              <Footer/>
            </div>
            
        </div>
       
    )
}