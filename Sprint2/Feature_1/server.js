// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Allow requests from frontend register.html
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

//To open homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");  
});

//Makes it easier for ID selection
function fileForId(id) {
  if (/^S[0-9]+$/.test(id)) return path.join(__dirname, "students.txt");
  if (/^O[0-9]+$/.test(id)) return path.join(__dirname, "organizers.txt");
  if (/^A[0-9]+$/.test(id)) return path.join(__dirname, "admins.txt");
  return null;
}

// Format: ID,Password,FirstName,LastName,email,phone
function parseUserLine(line) {
  const cleaned = line.replace(/,/g, " ").trim();
  if (!cleaned) return null;
  const parts = cleaned.split(/\s+/);
  if (parts.length < 2) return null;
  const [ID, Password] = parts;
  return { ID, Password };
}


// For register functionality
app.post("/register", (req, res) => {
  const { id, password, first, last, email, phone } = req.body || {};

  if (!id || !password || !first || !last || !email || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const target = fileForId(id);
  if (!target) {
    return res
      .status(400)
      .json({ message: "Invalid ID format. Use S/O/A followed by digits." });
  }

  const line = `${id},${password},${first},${last},${email},${phone}\n`;

  fs.appendFile(target, line, (err) => {
    if (err) return res.status(500).json({ message: "Error saving user" });
    return res.status(200).json({ message: "Registration successful" });
  });
});

// For login functionality
app.post("/login", (req, res) => {
  const { id, password } = req.body || {};
  if (!id || !password) {
    return res.status(400).json({ message: "Missing ID or password" });
  }

  const target = fileForId(id);
  if (!target) {
    return res
      .status(400)
      .json({ message: "Invalid ID format. Use S/O/A followed by digits." });
  }

  //Prefix determines user's category
  let role = null;
  if (id.startsWith("S")) role = "student";
  else if (id.startsWith("O")) role = "organizer";
  else if (id.startsWith("A")) role = "admin";

  fs.readFile(target, "utf8", (err, contents) => {
    if (err) {
      // If file missing, treat as no users
      if (err.code === "ENOENT") {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.status(500).json({ message: "Server error" });
    }

    const lines = contents.split("\n");
    const match = lines.some((line) => {
      const rec = parseUserLine(line);
      return rec && rec.ID === id && rec.Password === password;
    });

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ ok: true, role });
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});