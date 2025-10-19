import Footer from "../../../footer/Footer"
import Sidebar from "../../../sidebar/Sidebar"
import NoAcessMsg from "../../noAccessMsg"
import { CurrentUserContext } from "../../../../App"
import { useContext } from "react"
import TicketCard from "./TicketCard"
import "./ticketsPage.css"

export default function TicketsPage() {

    const {currentUser} = useContext(CurrentUserContext);

    return(
          <div className="page-container">
                <Sidebar/>
                <div className="main-content">              
                    
                    <div className="page-header"><h3>My Tickets</h3></div>
                    {currentUser && currentUser.isLoggedIn && currentUser.type === "student" ? 
                    <div className="events-container">

                    {currentUser?.claimedTickets.length === 0 ?
                        <div className="content-paragraphs">
                            <p>You have no claimed tickets yet</p>
                        </div>: 
                        currentUser.claimedTickets.sort((a,b) => new Date(a.date) - new Date(b.date)).map(t =>
                        <TicketCard user={currentUser} ticketId={t.ticketId} eventId={t.eventId}/>)    
                    }
                
                    </div> : <NoAcessMsg/>}
                    
                    <Footer/>
                </div>
            </div>
    )
}

