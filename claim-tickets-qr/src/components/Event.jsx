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
    
    function claimTicket() {
        //write function to claim ticket
        setClaimedTickets(s => [...s, {ticketNum:"001", eventId:"123"}])
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
}