//register.js file
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function handleRegister(userType, userName, password, firstName, lastName, email, phoneNumber, organization) {
    if (userType && userType === "organizer" && !organization) return {status: 400, msg: "Missing fields"};  
    if (!userType || !userName || !password || !firstName || !lastName || !email || !phoneNumber) 
        return {status: 400, msg: "Missing fields"};  
    
    //Here we validate the inputs
    if (!/^[SOA][0-9]+$/.test(userName)) {
      return {status: 401, msg: "Enter a valid ID"};
    }

    if (!/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+(\.[A-Za-z])?$/.test(email)) {
      return {status: 401, msg: "Invalid email"};
    }

    if (!/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/.test(phoneNumber)) {
     return {status: 401, msg: "Invalid phone number. Must be a 10-digit Canadian number."};
    }

    //Allows communication between frontend and backend 
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            type: userType,
            id: userName,
            password,
            firstName, 
            lastName, 
            email, 
            phoneNumber,
            organization
        }) 
    }

    try {
        const response = await fetch(`${SERVER_URL}/users`, options);
        let fetchResult = await response.json();
        console.log("response", fetchResult, response.status);
        if (fetchResult.data) 
            return {status:response.status, user:fetchResult.data, msg:fetchResult.msg}
        else return {status:response.status, msg:fetchResult.msg}
    }
    catch (err) {
        console.error(err);
        return {status:500, msg:"500 - Server error"}
    }
}


