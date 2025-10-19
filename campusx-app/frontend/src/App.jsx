import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import HomePage from './components/pages/home-page/HomePage'
import LoginPage from './components/pages/login-page/LoginPage';
import BrowseEventsPage from './components/pages/events-page/BrowseEventsPage';
import SavedEventsPage from './components/pages/user-pages/student/SavedEventsPage';
import TempPage from './components/pages/tempPage';
import EventPage from './components/pages/events-page/EventPage';
import RegisterPage from './components/pages/login-page/RegisterPage';
import ScreenNotification from './components/utils/screen_notification/Notification';
import CreateEventPage from './components/pages/user-pages/organizer/CreateEventPage';
import TicketsPage from './components/pages/user-pages/student/TicketsPage';

export const CurrentUserContext = createContext();
export const ScreenNotificationContext = createContext()


const pageRouter = createBrowserRouter([
  {path:"/", element: <HomePage/>, errorElement:<TempPage/>},
  {path:"/login", element: <LoginPage/>},
  {path:"/login/:userType", element: <LoginPage/>},
  {path:"/register", element: <RegisterPage/>},
  {path:"/register/:userType", element: <RegisterPage/>},
  {path:"/events", element: <BrowseEventsPage/>},
  {path:"/events/:eventId", element: <EventPage/>},

  //student pages
  {path:"/myevents", element: <SavedEventsPage/>},
  {path:"/mytickets", element: <TicketsPage/>},

  //organizer pages
  {path:"/dashboard", element: <TempPage/>},
  {path:"/events/create", element: <CreateEventPage/>},
]);


export default function App() {
  const [currentUser, setCurrentUser] = useState()
  const [screenNotification, setScreenNotification] = useState();
  
  function notifyUser(msg) {
    setScreenNotification(m => msg)
  } 

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    console.log(savedUser)
    if (savedUser) setCurrentUser(u => u = {...savedUser, isLoggedIn:true, savedEvents:savedUser.savedEvents? savedUser.savedEvents:[]});
  }, [])

  return (
    <ScreenNotificationContext.Provider value={{notifyUser, screenNotification, setScreenNotification}}>
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <ScreenNotification/>
        <RouterProvider router={pageRouter}/>
    </CurrentUserContext.Provider>
    </ScreenNotificationContext.Provider>
  )
}


