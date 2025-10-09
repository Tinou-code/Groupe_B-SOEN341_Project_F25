import QRCode from "qrcode"
import { useEffect, useState } from "react"
export default function Ticket({user, ticketNum, event}) {
   
    const ticketCode = `${event.id}-${ticketNum}-${user.id}`;
    const [qrcode, setQrcode] = useState(null);

    function generateQR(){
        //write function to generate ticket qr
        QRCode.toDataURL(ticketCode, (err, ticketCode) => {
            if (err) return console.error(err);
            setQrcode(q => ticketCode);
        })
    }

    useEffect(() => {
        generateQR();
    },[])
    
    return(
        <div className="ticket">
            <img src={qrcode} alt="ticket-qr"/>
            <span>
                ticket code:{ticketCode}
                event:{event.title}
            </span>
        </div>
    )
}