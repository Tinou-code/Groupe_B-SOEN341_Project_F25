<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>QR Ticket Scanner</title>
  <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
  <style>
    body { font-family: Arial; text-align: center; padding: 2rem; }
    #qr-reader { width: 300px; margin: auto; }
    #result { margin-top: 1rem; font-size: 1.2rem; font-weight: bold; }
  </style>
</head>
<body>
  <h2>🎟 QR Ticket Scanner</h2>

  <div id="qr-reader"></div>
  <div id="result">Scan a QR code to check ticket validity.</div>

  <script>
    // List of valid tickets
    const validTickets = ["TICKET123", "TICKET456", "TICKET789"];

    //  Called when a QR code is successfully scanned
    function onScanSuccess(decodedText) {
      const resultDiv = document.getElementById("result");
      if (validTickets.includes(decodedText)) {
        resultDiv.innerHTML = `Ticket is VALID<br>Scanned Code: ${decodedText}`;
        resultDiv.style.color = "green";
      } else {
        resultDiv.innerHTML = ` Invalid Ticket<br>Scanned Code: ${decodedText}`;
        resultDiv.style.color = "red";
      }
    }

    // Optional: error handling
    function onScanError(errorMessage) {
      // console.warn(errorMessage);
    }

    // Start the scanner
    const scanner = new Html5Qrcode("qr-reader");
    scanner.start(
      { facingMode: "environment" }, // back camera
      { fps: 10, qrbox: 250 },       // scanning settings
      onScanSuccess,
      onScanError
    );
  </script>
</body>
</html>
 