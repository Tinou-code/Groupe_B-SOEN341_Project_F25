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
         const response = await fetch(`${SERVER_URL}/events`, options);
         let fetchResult = await response.json();
         //console.log("response", fetchResult, response.status);
         if (fetchResult) {
            const organizations = new Set();
            fetchResult.data.map(e => organizations.add(e.organizer));
            return {status:response.status, organizations, msg:fetchResult.msg}}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }

 export async function getMembers(organization) {
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
         //console.log("response", fetchResult, response.status);
         if (fetchResult) {
            const members = new Set();
            fetchResult.map(m => m.organization === organization ? members.add(m):null);
            return {status:response.status, members, msg:fetchResult.msg}}
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

