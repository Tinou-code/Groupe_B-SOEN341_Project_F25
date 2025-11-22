const SERVER_URL = `${import.meta?.env?.VITE_SERVER_URL || "http://localhost:3000" }/api`;

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
         //console.log("response", fetchResult, response.status);
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
         //console.log("response", fetchResult, response.status);
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
         //console.log("response", fetchResult, response.status);
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

  export async function notifyByEmail(email, event) {
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          accept: "application/json",
      },
      body: JSON.stringify({ email, event }),
  };

  try {
      const response = await fetch(`${SERVER_URL}/notify/email`, options);
      const result = await response.json();
      return { status: response.status, msg: result.message };
  } catch (err) {
      return { status: 500, msg: "Server error" };
  }
}

export async function notifyBySMS(phoneNumber, event) {
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          accept: "application/json",
      },
      body: JSON.stringify({ phoneNumber, event }),
  };

  try {
      const response = await fetch(`${SERVER_URL}/notify/sms`, options);
      const result = await response.json();
      return { status: response.status, msg: result.message };
  } catch (err) {
      return { status: 500, msg: "Server error" };
  }
}