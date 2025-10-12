//temp mockup user list
const users = [
    {type:"student", userName:"S123", password:"1234"},
    {type:"admin", userName:"admin", password:"1234"},
    {type:"organizer", userName:"org", password:"1234"}
]

export default function handleLogin(userType, userName, password) {

    if (!userType | !userName | !password) return "400"
    if (users.find(u => u.type === userType && u.userName === userName && u.password === password)) {
        sessionStorage.setItem("loggedUser", JSON.stringify({type: userType, id: userName}))
        return "200" 
    }
    else return "404"; 
}

export function handleLogout() {
    sessionStorage.removeItem("loggedUser");
}