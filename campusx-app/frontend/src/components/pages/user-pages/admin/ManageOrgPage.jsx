import Footer from "../../../footer/Footer"
import Sidebar from "../../../sidebar/Sidebar"
import NoAccessMsg from "../../../error-page/noAccessMsg"

export default function ManageOrgPage() {
    return(
        <div className="page-container">
            <Sidebar/>
            <div className="main-content">
                <div className="page-header"><h2>Manage Organizations</h2></div>
                
                

                <Footer/>
            </div>
        </div>
    )
}