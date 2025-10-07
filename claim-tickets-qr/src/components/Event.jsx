import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"

//constructor for EventObject
export function EventObject(id, title, tickets) {
    this.id = id;
    this.title = title;
    this.tickets = tickets;
  }
export default function Event({id, title, tickets}) {

    const [availableTickets, setAvailableTickets] = useState()

    useEffect(() =>{
        setAvailableTickets(t => tickets)
    },[])

    const {currentUser, claimedTickets, setClaimedTickets} = useContext(UserContext)
    

        
    function claimTicket(eventId) {
        //write function to claim ticket
     
        setEvents(prevEvents =>
    prevEvents.map(event => {
      if (event.id === eventId && event.remainingTickets > 0) {
        // Reduce the ticket count
        return { ...event, remainingTickets: event.remainingTickets - 1 };
      }
      return event;
    })
  );

  setClaimedTickets(prevTickets => {
    // Get current count for generating next ticket number
    const nextTicketNum = String(prevTickets.length + 1).padStart(3, "0");
    return [...prevTickets, { ticketNum: nextTicketNum, eventId }];
  });
}

    }

    return(
        <div className="event">
            <span>
                Event<br/>
                id: {id}<br/>
                title: {title}<br/>
                tickets: {`${availableTickets}/${tickets}`}
            </span>
            <button onClick={()=>claimTicket()}>claim ticket</button>
        </div>
    )
