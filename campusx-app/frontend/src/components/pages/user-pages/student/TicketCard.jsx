import QRCode from "qrcode"
import { useEffect, useRef, useState } from "react"
import { getEvent } from "../../../../../../api/events";

export default function TicketCard({user, ticketId, eventId}) {
   
     const [event, setEvent] = useState();
     const [showpopup, setShowpopup] = useState(false);
   
       useEffect(() => {
           async function fetchEvent() {
               const response = await getEvent(eventId);
               //console.log("get event res", response); 
               setEvent(e => response.event);
           }
           fetchEvent()   
       }, [])

    const [qrcode, setQrcode] = useState(null);
    const ticketCode = `${ticketId}`;

    function generateQR(){
        //write function to generate ticket qr
        QRCode.toDataURL(ticketCode, {
            width: 400,
            margin: 2
        }, (err, ticketCode) => {
            if (err) return console.error(err);
            setQrcode(q => ticketCode);
        })
    }

    useEffect(() => {
        generateQR();
    },[])
    
    return( 
    <>
            <TicketPopUp qrcode={qrcode} user={user} eventId={event?.eventId} ticketId={ticketId} showpopup={showpopup} title={event?.title} setShowpopup={setShowpopup}/>
        <div className="ticket-card" onClick={(e) => {setShowpopup(p => !p); e.stopPropagation()}}>
           
            <div className="qrcode">
                <img id="qrcode-image" src={qrcode} alt="ticket-qr"/>
            </div>

            <div className="ticket-info">
                <div className="info">
                <span className="title">Event:&nbsp;</span> <span>{`${event?.eventId} - ${event?.title}`}</span>
                </div>
                <div className="info">
                <span className="title">Name:&nbsp;</span> <span>{`${user.lastName.toUpperCase()}, ${user.firstName.toUpperCase()}`}</span>
                </div>
                <div className="info">
                <span className="title"> ID:&nbsp;</span> <span>{user.userId}</span>
                </div>
                <div className="info">
                <span className="title">Ticket #&nbsp;</span> <span>{ticketId}</span>
                </div>
                
                <div className="info">
                <span className="title">Event Date:&nbsp;</span> <span>{event?.date}</span>
                </div> 
                <div className="info">
                <span className="title">Event Location:&nbsp;</span> <span>{event?.location}</span>
                </div>           
            </div>
        </div>
    </>
    )
}

//ticket popup - display qrcode for scanning or downloading
function TicketPopUp({qrcode, user, eventId, ticketId, showpopup, title, setShowpopup}) {

    const ticketPopupRef = useRef();

      useEffect(() => {
        
        function handler(e) {
            if (!showpopup) return;
            if (!ticketPopupRef.current) return;
            if (e.target instanceof Node && !ticketPopupRef.current.contains(e.target)) {
                    setShowpopup(p => false);
                }
            };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    });

    return(
        <div className={"ticket-popup-container"+(showpopup?"-open":"")}>
        <div className="ticket-popup" ref={ticketPopupRef}>
             <div className="qrcode">
                <img src={qrcode} alt="ticket-qr"/>
            </div>
            <div className="ticket-info">
                <div className="info">
                <span className="title">Name:&nbsp;</span> <span>{`${user.lastName.toUpperCase()}, ${user.firstName.toUpperCase()}`}</span>
                </div>
                <div className="info">
                <span className="title">ID:&nbsp;</span> <span>{user.userId}</span>
                </div>
                <div className="info">
                <span className="title">Ticket #&nbsp;</span> <span>{ticketId}</span>
                </div>
                <div className="info">
                <span className="title">Event:&nbsp;</span> <span>{`${eventId} - ${title}`}</span>
                </div>         
            </div>
        </div>
        </div>
    )

}