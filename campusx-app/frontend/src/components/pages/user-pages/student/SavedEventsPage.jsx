import { useContext, useEffect, useState } from "react"
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App"
import Sidebar from "../../../sidebar/Sidebar"
import Footer from "../../../footer/Footer"
import EventCard from "../../events-page/EventCard"
import NoAccessMsg from "../../../error-page/noAccessMsg"
import { getEvent } from "../../../../../../api/events"



export default function SavedEventsPage() {

    const {currentUser} = useContext(CurrentUserContext);
    const {notifyUser} = useContext(ScreenNotificationContext);
    const [events, setEvents] = useState(); 
    
  const notifyByEmail = async (eventObj) => {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    const response = await fetch("http://localhost:3000/api/notify/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        event: eventObj
      })
    });

    const data = await response.json();
    notifyUser(data.message);
  }

  /*const notifyBySMS = async (eventObj) => {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));

    const response = await fetch("http://localhost:3000/api/notify/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: user.phoneNumber,
        carrier: user.carrier,
        event: eventObj
      })
    });

    const data = await response.json();
    notifyUser(data.message);
  }*/

  useEffect(() => {

      async function fetchEvents() {
          if (!currentUser) return;

          const eventList = await Promise.all(
              currentUser?.savedEvents.map(async id => {
                  const response = await getEvent(id);
                  return response.event;
          }))

          //console.log("event list", eventList);
          setEvents(eventList);
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
                events?.map(event => (
                
                  <div key={event.eventId} className="saved-event-wrapper">
                    <EventCard event={event} />
                    <div className="notification-buttons">

                        <button 
                          className="notify-email-btn"
                          onClick={() => notifyByEmail(event)}>
                          Notify Me by Email
                        </button>

                        {/*<button 
                          className="notify-sms-btn"
                          onClick={() => notifyBySMS(event)}>
                          Notify Me by SMS
                        </button>*/}
                    </div>
                  </div>))}
          </div> : <NoAccessMsg/>}
            <Footer/>
        </div>
    </div>

    )
}