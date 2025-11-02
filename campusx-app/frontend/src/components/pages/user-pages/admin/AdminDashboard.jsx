import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAccessMsg from "../../../error-page/noAccessMsg";
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import { getEvents } from "../../../../../../api/events";
import "../organizer/orgDashboard.css"

export default function AdminDashboard() {

    const {notifyUser} = useContext(ScreenNotificationContext);

    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();
    const [ticketsIssued, setTicketsIssued] = useState();
    const [avgParticipation, setAvgParticipation] = useState();
    
    //fetch events from database when component mounts and/or when user saves/claims a ticket
    useEffect(() => {
        async function fetchEvents() {
            const response = await getEvents();
            //console.log("fetchevents", response); 
            setEvents(e => response.events);
        }
        fetchEvents();   
    }, []);

    useEffect(() => {
        if (!events) return;
        //calculate number of tickets issued and avg participation rate
        let numOfTickets = 0;
        let participation = 0;
        let numOfPastEvents = 0;
        events.map(e => {
            numOfTickets += Number(e.tickets)-Number(e.remainingTickets);
            //only include past events as there is no participation data for upcoming events yet
            if (new Date(e.date) < new Date()) {
                console.log(`${e.eventId}`, Number(e.attendees.length), Number(e.tickets), Number(e.remainingTickets));
                participation += Number(e.attendees.length)/(Number(e.tickets)-Number(e.remainingTickets));
                numOfPastEvents++;
            }
        });
        setTicketsIssued(t => numOfTickets);
        setAvgParticipation(a => Number(100*(participation/numOfPastEvents)).toFixed(2));
    }, [events]);

    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">              
                <div className="page-header"><h3>Admin Dashboard</h3></div> 

            {currentUser && currentUser?.isLoggedIn && currentUser?.type === "admin" ? 
            <div className="dashboard-container">
                <table id="event-table">
                    <tbody>
                        {events ? 
                        <>
                        <tr>
                            <td colSpan="2" className="table-head">Global Stats</td>
                        </tr>
                        <tr><td className="data-title">Number of events</td><td>{events.length}</td></tr>
                        <tr><td className="data-title">Total Tickets Issued</td><td>{ticketsIssued}</td></tr>
                        <tr><td className="data-title">Average Participation Rate</td><td>{`${avgParticipation}%`}</td></tr>
                        </>
                        :
                        <tr>
                            <td colSpan="2">No Data Found</td>
                        </tr>}
                    </tbody>
                </table>                
            </div>
            : <NoAccessMsg/>}
                <Footer/>
            </div>
        </div>
    )
}