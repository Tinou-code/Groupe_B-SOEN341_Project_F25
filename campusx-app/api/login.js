const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function handleLogin(userType, userName, password) {
    
    if (!userType | !userName | !password) return {status: 400, msg:"Missing fields"}; 
    
    if (!/^[SOA][0-9]+$/.test(userName)) {
      return {status: 401, msg: "Invalid username"};
    }
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            type: userType,
            password: password
        }) 
    }

    try {
        const response = await fetch(`${SERVER_URL}/users/${userName}`, options);
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

export function handleLogout() {
    sessionStorage.removeItem("loggedUser");
}