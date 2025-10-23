import { useParams } from "react-router-dom"
import { formatDate, formatTime, handleCancelTicket, handleClaimTicket, handleSaveEvent, handleUnsaveEvent } from "../../../../../api/events";
import { CurrentUserContext, ScreenNotificationContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";
import { getEvent } from "../../../../../api/events";
import NoAcessMsg from "../../error-page/noAccessMsg";
import { ErrorContext } from "../../../App"; 

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
                  console.log("get event res", response);
                  if (response.status !== 200) setError(response)
                  setEvent(e => response.event);
              }
              fetchEvent()   
          }, [])
    
          if (error) throw new Error(error.msg);

     async function saveEvent() {
       const response = await handleSaveEvent(currentUser?.userId, ev?.eventId);
       //console.log("save event res", response);
       setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     async function unsaveEvent() {
       const response = await handleUnsaveEvent(currentUser?.userId, ev?.eventId);
       //console.log("unsave event res", response);
       setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     async function claimTicket() {
       const response = await handleClaimTicket(currentUser?.userId, ev?.eventId);
       //console.log("claim ticket res", response);
       setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     async function unclaimTicket() {
        const response = await handleCancelTicket(currentUser?.userId, ev?.eventId);
       //console.log("claim ticket res", response);
       setCurrentUser(u => u = {...response.user, isLoggedIn:true}); 
       notifyUser(response.msg);
     }
   
     useEffect(() => {
       if (currentUser) sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));
     }, [currentUser])

    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">

              {currentUser && currentUser.isLoggedIn ? <>
              <div className="page-header"><h2>{ev?.title}</h2></div>
              <div className="event-page">
                <img src={ev?.imagePath} alt={ev?.title} className="event-image" />
                <div className="event-page-content">
                  <div className="event-tags">
                    <span className="event-tag">{ev?.category}</span>
                    <span className="event-tag">{ev?.type}</span>
                  </div>
                  <h2 className="event-page-title">{ev?.title} <br/> ID: {ev?.eventId}</h2>
                  
                  <div className="event-desc"><p>{ev?.desc}</p></div>

                  <span className="available-tickets">{`${ev?.remainingTickets}/${ev?.tickets}`} tickets remaining</span>
                  
                    <div className="event-detail"><span>{formatDate(ev?.date)}</span></div>
                    <div className="event-detail"><span>{formatTime(ev?.time)}</span></div>
                    <div className="event-detail"><span>{ev?.location}</span></div>
                  
                 
                    <span className="event-organizer">Organized by {ev?.organizer}</span>
                  

                  {currentUser?.type === "student" ? 
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
                </>: <><div className="page-header"><h2>Event Page</h2></div><NoAcessMsg/></>}
              <Footer/>
            </div>
            
        </div>
       
    )
}