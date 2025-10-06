export default function Ticket({ticketNum, eventId}) {
    
    function generateQR(){
        //write function to generate ticket qr
    }
    
    return(
        <div className="ticket">
            <img src={null} alt="ticket-qr"/>
            <span>
                ticket Number:{ticketNum}
                event id:{eventId}
            </span>
        </div>
    )
}