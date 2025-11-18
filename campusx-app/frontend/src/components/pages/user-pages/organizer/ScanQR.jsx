import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import FormStatusMsg from "../../../utils/formStatusMsg";
import "./scan-qr.css";

export default function ScanQR({showpopup, setShowpopup, guests}) {

  // List of valid tickets
  const validTickets = guests //["TICKET123", "TICKET456", "TICKET789"];
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState();
  const [guest, setGuest] = useState();
  const fileRef = useRef(null);

  // Called when QR code is decoded successfully
  function handleDecodedText(decodedText) {
    //const resultDiv = document.getElementById("result");
    let guest = validTickets.find(t => t.ticketNum === decodedText);
    if (guest) {
      setGuest(g => guest);
      setStatus(s => 200);
      setMsg(m => `Ticket ${decodedText} is VALID`);
    } else {
      setStatus(s => 400);
      setMsg(m => `Ticket ${decodedText} is NOT VALID`);
    }
  }

  // Handle file upload and scan
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const html5QrCode = new Html5Qrcode(/* element id */ "qr-reader");
    html5QrCode.scanFile(file, true)
      .then(decodedText => {
        handleDecodedText(decodedText);
      })
      .catch(err => {
        //document.getElementById("result").innerHTML = "Could not read QR code. Please try another image.";
        //document.getElementById("result").style.color = "orange";
        setStatus(s => 400);
        setMsg(m => "Could not read QR code. Please try another file.");
        console.error("Error scanning file:", err);
      });
  };

  const scanPopupRef = useRef();
    useEffect(() => {
      function handler(e) {
          if (!showpopup) return;
          if (!scanPopupRef.current) return;
          if (e.target instanceof Node && !scanPopupRef.current.contains(e.target)) {
                  setShowpopup(p => false);
                  fileRef.current.value = "";
                  setStatus(s => 0);
                  setMsg(m => null);
              }
          };
      document.addEventListener("click", handler);
      return () => {
          document.removeEventListener("click", handler);
      }
  });

  return(
    /*<head>
      <meta charset="UTF-8"/>
      <title>QR Ticket Scanner (Upload)</title>
      <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    </head>*/

    <div className={"ticket-popup-container"+(showpopup?"-open":"")}>
    <div className="ticket-popup" ref={scanPopupRef}>
      <div className="qr-scanner">
        <h2> QR Ticket Scanner (Upload Image)</h2>

        <p>Upload a QR code image below to check ticket validity.</p>

        <input ref={fileRef} type="file" id="file-input" accept="image/*"
          onChange={e => handleFileUpload(e)}/>

        {fileRef.current && fileRef.current?.value ? 
        <div id="qr-result">
          <FormStatusMsg status={status} msg={msg}/>
          {status === 200 ? 
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Ticket Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="guest-data">{guest.studentId}</td>
                  <td className="guest-data">{`${guest.lastName}, ${guest.firstName}`}</td>
                  <td className="guest-data">{guest.ticketNum}</td>
                </tr>
              </tbody>
            </table>:""
          }
        </div>:""}
        <div id="qr-reader" style={{display: "none"}}></div>
      </div>
      </div>
    </div>
)}
