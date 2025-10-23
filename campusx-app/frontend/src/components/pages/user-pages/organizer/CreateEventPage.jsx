import FormStatusMsg from "../../../utils/formStatusMsg";
import Sidebar from "../../../sidebar/Sidebar";
import Footer from "../../../footer/Footer";
import NoAcessMsg from "../../../error-page/noAccessMsg";
import { CurrentUserContext, ScreenNotificationContext } from "../../../../App";
import { useContext, useState } from "react";
import { handleCreateEvent } from "../../../../../../api/events";
import "./createEventPage.css"


export default function CreateEventPage() {

    const {notifyUser} = useContext(ScreenNotificationContext);

    const {currentUser} = useContext(CurrentUserContext);
    const [eventStatus, setEventStatus] = useState(0);
    const [errMsg, setErrMsg] = useState("");

    const createEvent = async (e) => {
        e.preventDefault();
        const response = await handleCreateEvent(
            title,
            date,
            time,
            location,
            category,
            organization,
            capacity,
            type,
            imagePath,
            desc
        );
        //console.log("create event result", response);
        setEventStatus(response.status);
        setErrMsg(response.msg);
        notifyUser(response.msg);

    }

    const [organization, setOrganization] = useState(currentUser?.organization);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [desc, setDesc] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [capacity, setCapacity] = useState("");
    const [category, setCategory] = useState("");
        const categories = [
            "Technology",
            "Entertainment",
            "Career",
            "Workshop",
            "Culture",
        ]
    const [type, setType] = useState("");

    return(
        <div className="page-container">
            <Sidebar/>

            <div className="main-content">              
                
                <div className="page-header"><h3>Create an event<br/>
                Fill in the form below to create a new event
                </h3></div>
                
            {currentUser && currentUser.isLoggedIn && currentUser.type === "organizer" ? 
                

                <form onSubmit={createEvent} className="event-form">
                    
                    <FormStatusMsg status={eventStatus} msg={errMsg}/> 
                    
                    <div className="form-group">
                    <label htmlFor="name" className="form-label">Organization*</label>
                    <input type="text" className="form-input" id="form-input-organization" readOnly={true}
                    value={organization} onChange={(e) => setOrganization(o => e.target.value)}/>
                    </div>

                    <div className="form-elements">
                   
                        <div>
                            <div className="form-group">
                            <label htmlFor="name" className="form-label">Event Title*</label>
                            <input type="text" id="name" name="name" className="form-input"
                            value={title} onChange={e => setTitle(t => e.target.value)} required />
                            </div>

                            <div className="form-group">
                            <label htmlFor="date" className="form-label">Date*</label>
                            <input type="date" id="date" name="date" className="form-input" 
                            value={date} onChange={e => setDate(t => e.target.value)} required />
                            </div>

                            <div className="form-group">
                            <label htmlFor="time" className="form-label">Time*</label>
                            <input type="time" id="time" name="time" className="form-input" 
                            value={time} onChange={e => setTime(t => e.target.value)} required />
                            </div>

                            <div className="form-group">
                            <label htmlFor="location" className="form-label">Location*</label>
                            <input type="text" id="location" name="location" className="form-input"
                            value={location} onChange={e => setLocation(t => e.target.value)}  required />
                            </div>
                        </div>
                        
                        <div>
                            <div className="form-group">
                            <label className="form-label">Category*</label>
                            <select className="form-input"
                                value={category} onChange={e => setCategory(t => e.target.value)}  required>
                                    <option value="">Select an option</option>
                                        {categories.sort().map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    <option value="Other">Other</option>
                            </select>
                            </div>

                            <div className="form-group">
                            <label className="form-label">Capacity*</label>
                            <input type="number" className="form-input"
                            value={capacity} onChange={e => setCapacity(t => e.target.value)}  required />
                            </div>

                            <div className="form-group">
                            <label className="form-label">Event type*</label>
                            <select className="form-input"
                                value={type} onChange={e => setType(t => e.target.value)}  required>
                                    <option value="">Select an option</option>
                                    <option value="Free">Free</option>
                                    <option value="Paid">Paid</option>
                            </select>
                            </div>

                            <div className="form-group">
                            <label className="form-label">Event Banner</label>
                            <input type="text" className="form-input" 
                                value={imagePath} onChange={e => setImagePath(t => e.target.value)} placeholder="(Optional) URL to event banner image"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Description*</label>
                            <textarea id="description" name="description" className="form-input" rows="5" 
                            value={desc} onChange={e => setDesc(t => e.target.value)} required></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Create Event</button>
                </form>

            : <NoAcessMsg/>}
                
                <Footer/>
            </div>
        </div>
    )
}