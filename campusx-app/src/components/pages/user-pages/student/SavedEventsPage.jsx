import { useContext } from "react"
import { CurrentUserContext } from "../../../../App"
import Sidebar from "../../../sidebar/Sidebar"
import HeroBanner from "../../home-page/HeroBanner"
import Footer from "../../../footer/Footer"
import EventCard from "../../events-page/EventCard"



export default function SavedEventsPage() {

    const {currentUser} = useContext(CurrentUserContext)

    return(

    <div className="page-container">
        <Sidebar/>
        <div className="main-content">
            <HeroBanner/>
            {!currentUser?                 
                <div className="content-paragraphs">
                    <p>You need to login o access this content</p>
                </div>:
            <>
            <h3>My Saved Events</h3>
            <div className="events-container">
            {   !currentUser.savedEvents | currentUser?.savedEvents?.length === 0 ? 
                <div className="content-paragraphs">
                    <p>You have not saved events yet</p>
                </div>:
                currentUser?.savedEvents?.map(event => <EventCard key={event.id} ev={event} />)
            }
            </div>
            </>
            }
            
            <Footer/>
        </div>
    </div>

    )
}