import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAccessMsg from "../../../error-page/noAccessMsg";
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import { getEvents } from "../../../../../../api/events";
import "../organizer/org-dashboard.css"
import { getOrganizations, getStudents } from "../../../../../../api/admin";

export default function AdminDashboard() {

    //const {notifyUser} = useContext(ScreenNotificationContext);

    const {currentUser} = useContext(CurrentUserContext);
    const [events, setEvents] = useState();
    const [ticketsIssued, setTicketsIssued] = useState();
    const [avgParticipation, setAvgParticipation] = useState();
    const [organizations, setOrganizations] = useState();
    const [students, setStudents] = useState();

    //fetch events from database when component mounts and/or when user saves/claims a ticket
    useEffect(() => {
        async function fetchEvents() {
            const response = await getEvents();
            //console.log("fetchevents", response); 
            setEvents(response.events);
        }
        async function fetchOrgs() {
            const response = await getOrganizations();
            //console.log("response2", response.organizations); 
            setOrganizations([...response.organizations].sort());
        }
        async function fetchStudents() {
            const response = await getStudents();
            setStudents(response.students);
        }
        fetchEvents(); 
        fetchOrgs()
        fetchStudents();  
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
                //console.log(`${e.eventId}`, Number(e.attendees.length), Number(e.tickets), Number(e.remainingTickets));
                participation += Number(e.attendees.length)/(Number(e.tickets)-Number(e.remainingTickets));
                numOfPastEvents++;
            }
        });
        setTicketsIssued(numOfTickets);
        setAvgParticipation(Number(100*(participation/numOfPastEvents)).toFixed(2));
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
                        {events && students ? 
                        <>
                        <tr>
                            <td colSpan="2" className="table-head">Global Stats</td>
                        </tr>
                        <tr><td className="data-title">Total number of students</td><td>{students.length}</td></tr>
                        <tr><td className="data-title">Total number of events</td><td>{events.length}</td></tr>
                        <tr><td className="data-title">Total number of tickets issued</td><td>{ticketsIssued}</td></tr>
                        <tr><td className="data-title">Average participation rate</td><td>{`${avgParticipation}%`}</td></tr>
                        </>
                        :
                        <tr>
                            <td colSpan="2">No Data Found</td>
                        </tr>}
                    </tbody>
                </table>   

              {organizations ?
            <table className="org-members">
                <thead>
                     <tr>
                        <td colSpan="5" className="table-head">All Organizations {`(${organizations.length})`}</td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Events</th>
                        <th>Organizations Status</th>
                    </tr>
                </thead>
                <tbody>
                    {organizations?.sort((a,b) => a.name.localeCompare(b.name)).map(o => 
                    <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.name}</td>
                        <td>{o.members.length}</td>
                        <td>{events?.filter(e => e.organizer === o.name).length}</td>
                        <td>
                            <span className="action">
                            <span className={"status" + (o.isApproved ? "-approved":"-unapproved")}>{o.isApproved ? "Approved":"Not Approved"}</span>
                            </span>
                        </td>
                    </tr>
                    )}
                </tbody>
                </table> : <div className="content-paragraphs">
                            <p>No data found</p>
                            </div>}             
            </div>
            : <NoAccessMsg/>}
                <Footer/>
            </div>
        </div>
    )
}