<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>QR Ticket Scanner (Upload)</title>
  <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
  <style>
    body { 
      font-family: Arial; 
      text-align: center; 
      padding: 2rem; 
    }
    #qr-reader { 
      display: none; 
    }
    #result { 
      margin-top: 1rem; 
      font-size: 1.2rem; 
      font-weight: bold; 
    }
    input[type="file"] {
      margin-top: 1rem;
      padding: 0.5rem;
    }
  </style>
</head>
<body>
  <h2> QR Ticket Scanner (Upload Image)</h2>

  <p>Upload a QR code image below to check ticket validity.</p>

  <input type="file" id="file-input" accept="image/*">
  <div id="result">No image uploaded yet.</div>

  <script>
    // List of valid tickets
    const validTickets = ["TICKET123", "TICKET456", "TICKET789"];

    // Called when QR code is decoded successfully
    function handleDecodedText(decodedText) {
      const resultDiv = document.getElementById("result");
      if (validTickets.includes(decodedText)) {
        resultDiv.innerHTML = `Ticket is VALID<br>Scanned Code: ${decodedText}`;
        resultDiv.style.color = "green";
      } else {
        resultDiv.innerHTML = `Invalid Ticket<br>Scanned Code: ${decodedText}`;
        resultDiv.style.color = "red";
      }
    }

    // Handle file upload and scan
    document.getElementById("file-input").addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const html5QrCode = new Html5Qrcode(/* element id */ "qr-reader");
      html5QrCode.scanFile(file, true)
        .then(decodedText => {
          handleDecodedText(decodedText);
        })
        .catch(err => {
          document.getElementById("result").innerHTML = " Could not read QR code. Please try another image.";
          document.getElementById("result").style.color = "orange";
          console.error("Error scanning file:", err);
        });
    });
  </script>
</body>
</html>
