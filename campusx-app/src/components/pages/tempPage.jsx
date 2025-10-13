import Sidebar from "../sidebar/Sidebar"
import HeroBanner from "./home-page/HeroBanner"
import Footer from "../footer/Footer"

export default function TempPage() {
    return(
        <>
        <div className="page-container">
            <Sidebar/>
            
            <div className="main-content">
        
                    <HeroBanner/>
    
                <div className="content-paragraphs">
                    <p>This page is under construction</p>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}