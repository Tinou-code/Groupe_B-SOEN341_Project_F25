const eventList = [
    {
      title: "Tech Innovation Summit 2025",
      date: "2025-10-15",
      time: "14:00",
      location: "Hall Building 101",
      category: "Technology",
      organizer: "Tech Club",
      tickets: 50,
      type:"Paid",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Annual Career Fair",
      date: "2025-10-20",
      time: "10:00",
      location: "Library Building Main Floor",
      category: "Career",
      organizer: "Career Services",
      tickets: 50,
      type:"Free",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Spring Music Festival",
      date: "2025-10-25",
      time: "18:00",
      location: "Hall Building 531",
      category: "Entertainment",
      organizer: "Music Society",
      tickets: 50,
      type:"Free",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Entrepreneurship Workshop",
      date: "2025-10-18",
      time: "13:00",
      location: "Hall Building 823",
      category: "Workshop",
      organizer: "Entrepreneurship Club",
      tickets: 0,
      type:"Free",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    },
    {
      id: 5,
      title: "International Food Festival",
      date: "2025-10-22",
      time: "12:00",
      location: "Hall Building 507",
      category: "Culture",
      organizer: "International Students Association",
      tickets: 50,
      type:"Paid",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
    },
    {
      id: 6,
      title: "AI & Machine Learning Seminar",
      date: "2025-10-28",
      time: "15:30",
      location: "Hall Building 507",
      category: "Technology",
      organizer: "AI Research Group",
      tickets: 70,
      type:"Paid",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
  ];

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

 export async function handleCreateEvent(title,date,time,location,category,organizer,tickets,type,image,desc) { 
     if (!title || !date || !time || !location || !category || !organizer || !tickets || !type || !desc) //image is treated as optional for now
         return {status: 400, msg: "Missing fields"};  
     
     //Here we validate the inputs //do not accept event with date earlier than current date
     if (new Date(date) <= new Date()) { 
       return {status: 401, msg: "Enter a valid date for the event!"};
     }
 
     //Allows communication between frontend and backend 
     const options = {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         },
         body: JSON.stringify({
          title,
          date,
          time,
          location,
          category,
          organizer,
          tickets,
          type,
          desc,
          imagePath: image?image:null
         }) 
     }
 
     try {
         const response = await fetch(`${SERVER_URL}/events`, options);
         let fetchResult = await response.json();
         console.log("response", fetchResult, response.status);
         if (fetchResult.data) 
             return {status:response.status, event:fetchResult.data, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }


export async function getEvents() {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/events`, options);
         let fetchResult = await response.json();
         console.log("response", fetchResult, response.status);
         if (fetchResult) 
             return {status:response.status, events:fetchResult.data, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

export async function getEvent(eventId) {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/events/${eventId}`, options);
         let fetchResult = await response.json();
         console.log("response", fetchResult, response.status);
         if (fetchResult) 
             return {status:response.status, event:fetchResult.data, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

 //handle database update when user saves an event
export async function handleSaveEvent(userId, eventId) {
  const options = {
         method: "PATCH",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         },
         body: JSON.stringify({
          userId, eventId
         })
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/users/save`, options);
         let fetchResult = await response.json();
         if (fetchResult) 
             return {status:response.status, data:fetchResult.data, user:fetchResult.user, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
}

export async function handleUnsaveEvent(userId, eventId) {
  const options = {
         method: "PATCH",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         },
         body: JSON.stringify({
          userId, eventId
         })
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/users/unsave`, options);
         let fetchResult = await response.json();
         if (fetchResult) 
             return {status:response.status, data:fetchResult.data, user:fetchResult.user, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
}

export async function handleClaimTicket(userId, eventId) {
  const options = {
         method: "PATCH",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         },
         body: JSON.stringify({
          userId, eventId
         })
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/users/claim`, options);
         let fetchResult = await response.json();
         if (fetchResult) 
             return {status:response.status, data:fetchResult.data, user:fetchResult.user, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
}

export async function handleCancelTicket(userId, eventId) {
  const options = {
         method: "PATCH",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         },
         body: JSON.stringify({
          userId, eventId
         })
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/users/cancel`, options);
         let fetchResult = await response.json();
         if (fetchResult) 
             return {status:response.status, data:fetchResult.data, user:fetchResult.user, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
}
  
  // ---------------- HELPERS ----------------
  export function formatDate(dateString) {
    if (!dateString) return;
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" };
    return date.toLocaleDateString("en-US", options);
  }
  
  export function formatTime(timeString) {
    if (!timeString) return;
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }