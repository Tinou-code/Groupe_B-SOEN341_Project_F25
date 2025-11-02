//functions to fetch data for admins
const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export async function getOrganizations() {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/organizations`, options);
         let fetchResult = await response.json();
         //console.log("response", fetchResult, response.status);
         if (fetchResult) {
            return {status:response.status, organizations:fetchResult.data, msg:fetchResult.msg}}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

 export async function getOrganization(orgId) {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/organizations/${orgId}`, options);
         let fetchResult = await response.json();
         //console.log("response", fetchResult, response.status);
         if (fetchResult) {
            return {status:response.status, organization:fetchResult.data, msg:fetchResult.msg}}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

 export async function getMembers(orgId) {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/users`, options);
         let fetchResult = await response.json();
         const org = await fetch(`${SERVER_URL}/organizations/${orgId}`, options);
         let orgResult = await org.json();
         //console.log("response", fetchResult, orgResult);
         if (fetchResult) {
            const members = new Set();
            fetchResult.data.map(m => m.organization === orgResult.data.name ? members.add(m):null);
            return {status:response.status, members:[...members], msg:fetchResult.msg}}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

 export async function getStudents() {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }
 
     try {
         const response = await fetch(`${SERVER_URL}/users`, options);
         let fetchResult = await response.json();
         //console.log("response", fetchResult, orgResult);
         if (fetchResult) {
            const students = new Set();
            fetchResult.data.map(s => s.type === "student" ? students.add(s.userId):null);
            return {status:response.status, students:[...students], msg:fetchResult.msg}}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

 //handle database update when admin approves an organizer account
 export async function handleApproveAccount(userId) {
   const options = {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              accept: "application/json"
          },
          body: JSON.stringify({
           userId,
           isApproved:true
          })
       }
  
      try {
          const response = await fetch(`${SERVER_URL}/users/approve`, options);
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

  //handle database update when admin disables an organizer account
 export async function handleDisableAccount(userId) {
   const options = {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              accept: "application/json"
          },
          body: JSON.stringify({
           userId,
           isApproved:false
          })
       }
  
      try {
          const response = await fetch(`${SERVER_URL}/users/approve`, options);
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

  //handle database update when admin approves or suspends an event
 export async function handleAproveEvent(eventId, isApproved) {
   const options = {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              accept: "application/json"
          },
          body: JSON.stringify({
           eventId,
           isApproved
          })
       }
  
      try {
          const response = await fetch(`${SERVER_URL}/events/approve`, options);
          let fetchResult = await response.json();
          if (fetchResult) 
              return {status:response.status, event:fetchResult.event, data:fetchResult.data, msg:fetchResult.msg}
          else return {status:response.status, msg:fetchResult.msg}
      }
      catch (err) {
          console.error(err);
          return {status:500, msg:"500 - Server error"}
      }
 }


