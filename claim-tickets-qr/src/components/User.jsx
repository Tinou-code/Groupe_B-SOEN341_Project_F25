import { useContext, useState } from "react";
import {UserContext} from "../App"
import Ticket from "./Ticket";

export default function User() {
    
    const {currentUser, claimedTickets} = useContext(UserContext)

    return(
        <div className="user">
            <span>
                User<br/>
                id: {currentUser.id}<br/>
                name: {currentUser.name}<br/>
                tickets:   
                    {!claimedTickets ? "no tickets claimed yet" : 
                    claimedTickets.map(t => (
                        <Ticket key={`${t.event.id}-${t.ticketNum}`} 
                        ticketNum={t.ticketNum} event={t.event} user={currentUser}/>
                    ))}
            </span>
        </div>
    )
}