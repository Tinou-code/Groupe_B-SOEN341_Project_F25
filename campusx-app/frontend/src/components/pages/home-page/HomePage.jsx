import LoginButton from "../../buttons/LoginButton"
import Footer from "../../footer/Footer"
import Sidebar from "../../sidebar/Sidebar"
import HeroBanner from "./HeroBanner"
import "./homePage.css"

export default function HomePage() {
    return(
    <div className="page-container">
        <Sidebar/>
        
        <div className="home-main-content">
    
                <HeroBanner/>

            <div className="content-paragraphs">
                <p>Welcome to CampX, your ultimate hub for discovering and tracking all the exciting happenings on campus. Whether you're looking for academic seminars, cultural festivals, career fairs, or social gatherings, we've got you covered. Our platform makes it easy to stay connected with the vibrant campus community and never miss out on opportunities that matter to you.</p>
                
                <p>Students today face the challenge of balancing academics, extracurricular activities, and personal growth. With so many events happening across different departments and organizations, it can be overwhelming to keep track of everything. That's why we created this centralized platform where you can browse, filter, and bookmark events that align with your interests and schedule.</p>
                
                <p>Our mission is to foster a more connected and engaged campus community. We believe that participation in campus events enriches the college experience, helps students build meaningful relationships, and provides valuable learning opportunities outside the classNameroom. From technology summits to art exhibitions, every event contributes to the diverse tapestry of campus life.</p>
                
                <p>The platform features an intuitive interface designed with students in mind. Browse events by category, date, or location. Set up personalized notifications so you never miss registration deadlines or event reminders. Create your own profile to track attended events and discover recommendations based on your interests and past participation.</p>
                
                <p>For event organizers, we provide powerful tools to create, manage, and promote your events. Reach your target audience effectively, track registrations, and gather feedback to improve future events. Whether you're organizing a small workshop or a large-scale conference, our platform streamlines the entire process from planning to execution.</p>
                
                <p>Campus administrators can leverage our analytics dashboard to gain insights into student engagement patterns, popular event categories, and attendance trends. This data-driven approach helps inform programming decisions and resource allocation, ensuring that campus events continue to meet the evolving needs and interests of the student body.</p>
                
                <p>We're constantly working to improve and expand our features based on user feedback. Recent additions include integration with campus calendars, mobile app support, and enhanced search capabilities. Our development team is committed to maintaining a platform that's reliable, user-friendly, and responsive to the needs of our community.</p>
                
                <p>Join thousands of students, faculty, and staff who are already using Campus Events to enhance their university experience. Create your account today and start exploring the amazing opportunities waiting for you. Together, we're building a more vibrant, connected, and engaged campus community. Your next great experience is just a click away!</p>
            </div>
            <Footer/>
        </div>
    </div>
    )
}