import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import HomePage from './components/pages/home-page/HomePage'
import LoginPage from './components/pages/login-page/LoginPage';
import BrowseEventsPage from './components/pages/events-page/BrowseEventsPage';
import SavedEventsPage from './components/pages/user-pages/student/SavedEventsPage';
import TempPage from './components/pages/tempPage';
import EventPage from './components/pages/events-page/EventPage';

export const CurrentUserContext = createContext();


const pageRouter = createBrowserRouter([
  {path:"/", element: <HomePage/>, errorElement:<TempPage/>},
  {path:"/login", element: <LoginPage/>},
  {path:"/login/:userType", element: <LoginPage/>},
  {path:"/events", element: <BrowseEventsPage/>},
  {path:"/events/:eventId", element: <EventPage/>},
  {path:"/myevents", element: <SavedEventsPage/>},
  {path:"/mytickets", element: <TempPage/>},
]);


export default function App() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    console.log(savedUser)
    if (savedUser) setCurrentUser(u => u = {...savedUser, isLoggedIn:true, savedEvents:savedUser.savedEvents? savedUser.savedEvents:[]});
  }, [])

  return (
    
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <RouterProvider router={pageRouter}/>
    </CurrentUserContext.Provider>

  )
}

