import { useContext, useState } from "react";
import {UserContext} from "../App"
import Ticket from "./Ticket";

export default function User() {
    
    const {currentUser, claimedTickets} = useContext(UserContext)

    function listTickets(tickets) {
      
        
    }

    return(
        <div className="user">
            <span>
                User<br/>
                id: {currentUser.id}<br/>
                name: {currentUser.name}<br/>
                tickets:   
                    {!claimedTickets ? "no tickets claimed yet" : 
                    claimedTickets.map(t => (
                        <Ticket key={`${t.eventId}-${t.ticketNum}`} 
                        ticketNum={t.ticketNum} eventId={t.eventId}/>
                    ))}
            </span>
        </div>
    )
}