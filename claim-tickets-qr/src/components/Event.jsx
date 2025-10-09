import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"

//constructor for EventObject
export function EventObject(id, title, tickets) {
    this.id = id;
    this.title = title;
    this.tickets = tickets;
  }

//event component
export default function Event({event}) {

    const [availableTickets, setAvailableTickets] = useState()

    useEffect(() =>{
        setAvailableTickets(t => event.tickets)
    },[])

    const {currentUser, claimedTickets, setClaimedTickets} = useContext(UserContext)
        
    function claimTicket() {
      //write function to claim ticket
      if (availableTickets < 1) {
        alert("no more tickets to claim"); 
        return;
      }

      if (claimedTickets && claimedTickets.some(t => t.event.id === event.id)) {
        alert("you already have a ticket for this event"); 
        return;
      }
 
      // Reduce the ticket count
      setAvailableTickets(t => t-1);
      
      // Get current count for generating next ticket number
      const nextTicketNum = String(Number(event.tickets)-Number(availableTickets)+1).padStart(3, "0");
      setClaimedTickets(t => t = [...t, { user: currentUser, ticketNum: nextTicketNum, event: event}]);
    }

    return (
        <div className="event">
            <span>
                Event<br/>
                id: {event.id}<br/>
                title: {event.title}<br/>
                tickets: {`${availableTickets}/${event.tickets}`}
            </span>
            <button onClick={()=>claimTicket()}>claim ticket</button>
        </div>
    )

  }