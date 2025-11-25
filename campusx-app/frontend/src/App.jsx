import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import HomePage from './components/pages/home-page/HomePage'
import LoginPage from './components/pages/login-page/LoginPage';
import BrowseEventsPage from './components/pages/events-page/BrowseEventsPage';
import SavedEventsPage from './components/pages/user-pages/student/SavedEventsPage';
import EventPage from './components/pages/events-page/EventPage';
import RegisterPage from './components/pages/login-page/RegisterPage';
import ScreenNotification from './components/utils/screen_notification/Notification';
import CreateEventPage from './components/pages/user-pages/organizer/CreateEventPage';
import TicketsPage from './components/pages/user-pages/student/TicketsPage';
import CalendarPage from './components/pages/user-pages/student/CalendarPage';
import ErrorPage from './components/error-page/ErrorPage';
import ErrorBoundaryLayout from './components/error-page/ErrorBoundaryLayout';
import ManageOrgPage from './components/pages/user-pages/admin/ManageOrgPage';
import OrgDashboard from './components/pages/user-pages/organizer/OrgDashboard';
import MyOrgEvents from './components/pages/user-pages/organizer/MyOrgEvents';
import OrganizationPage from './components/pages/user-pages/admin/OrganizationPage';
import AdminDashboard from './components/pages/user-pages/admin/AdminDashboard';
import AboutPage from './components/pages/AboutPage';


export const ErrorContext = createContext()
export const CurrentUserContext = createContext();
export const ScreenNotificationContext = createContext()


const pageRouter = createBrowserRouter([
  { element: <ErrorBoundaryLayout/>, 
    errorElement: <ErrorPage/>,
    children: [ 
      {path:"/", element: <HomePage/>},
      {path:"/login", element: <LoginPage/>},
      {path:"/login/:userType", element: <LoginPage/>},
      {path:"/register", element: <RegisterPage/>},
      {path:"/register/:userType", element: <RegisterPage/>},
      {path:"/events", element: <BrowseEventsPage/>},
      {path:"/events/:eventId", element: <EventPage/>},
      {path:"/about", element: <AboutPage/>},

      //student pages
      {path:"/myevents", element: <SavedEventsPage/>},
      {path:"/mytickets", element: <TicketsPage/>},
      {path:"/mycalendar", element: <CalendarPage/>},

      //organizer pages
      {path:"/organizer/dashboard", element: <OrgDashboard/>},
      {path:"/organizer/events", element: <MyOrgEvents/>},
      {path:"/organizer/create", element: <CreateEventPage/>},

      //admin pages
      {path:"/admin/organizers", element: <ManageOrgPage/>, 
        children: [
          {path:"/admin/organizers/:organization", element: <OrganizationPage/>},
        ]},
      {path:"/admin/dashboard", element: <AdminDashboard/>},
    ],
  },
  
]);


export default function App() {


  const [currentUser, setCurrentUser] = useState()
  const [screenNotification, setScreenNotification] = useState();
  const [error, setError] = useState();
  
  function notifyUser(msg) {
    setScreenNotification(msg)
  } 

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    //console.log(savedUser)
    if (savedUser) setCurrentUser({...savedUser, isLoggedIn:true});
  }, [])

  return (
   
    <ErrorContext.Provider value={{error, setError}}>
    <ScreenNotificationContext.Provider value={{notifyUser, screenNotification, setScreenNotification}}>
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <ScreenNotification/>
        
          <RouterProvider router={pageRouter}/>
        
    </CurrentUserContext.Provider>
    </ScreenNotificationContext.Provider>
    </ErrorContext.Provider>
 
  )
}


