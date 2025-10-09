import './App.css'
import Event from './components/Event';
import User from './components/User';
import { createContext, useContext, useState } from 'react';
import { EventObject } from './components/Event';

export const UserContext = createContext()

function App() {

  //mockup list of events
  const events = [
    new EventObject(1000, "event 1", 1),
    new EventObject(1001, "event 2", 5),
    new EventObject(1002, "event 3", 6),
  ]

  //mockup user
  const currentUser = {id:12345, name:"my name"};
  const [claimedTickets, setClaimedTickets] = useState("");

  return (
    <UserContext.Provider value={{currentUser, claimedTickets, setClaimedTickets}}>
    <User/>
    {events.map(e => (
      <Event key={e.id} event={e}/>
    ))}
    </UserContext.Provider>
  )
}

export default App
