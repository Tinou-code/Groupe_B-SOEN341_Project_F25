const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export async function getUser(userId) {
  const options = {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             accept: "application/json"
         }
      }

     try {
         const response = await fetch(`${SERVER_URL}/users/${userId}`, options);
         let fetchResult = await response.json();
         //console.log("response", fetchResult, response.status);
         if (fetchResult) 
             return {status:response.status, user:fetchResult, msg:fetchResult.msg}
         else return {status:response.status, msg:fetchResult.msg}
     }
     catch (err) {
         console.error(err);
         return {status:500, msg:"500 - Server error"}
     }
 }