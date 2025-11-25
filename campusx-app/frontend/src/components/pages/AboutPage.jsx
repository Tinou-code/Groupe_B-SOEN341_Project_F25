import Footer from "../footer/Footer"
import Sidebar from "../sidebar/Sidebar"

export default function AboutPage() {

    return(
    <div className="page-container">
        <Sidebar/>
        
        <div className="main-content">

            <div className="page-header"><h3>About<br/>
                </h3></div>
            <div>    
            <div className="content-paragraphs">
                <p>Campusx is your ultimate hub for discovering and tracking all the exciting happenings on campus. 
                    Whether you're looking for academic seminars, cultural festivals, career fairs, or social gatherings, we've got you covered. 
                    Our platform makes it easy to stay connected with the vibrant campus community and never miss out on opportunities that matter to you.</p>
                    
                <p>For any inquiries, you can contact the administration at : <b>contact@campusx-concordia.ca</b></p>
            </div>
            <div className="dashboard-container"> 
            
            <table id="event-table">
                    <tbody>
                    <tr><td colSpan={3} className="table-head">Dev Team</td></tr>
                    <tr><td>Saeed Ramez Fakhouri</td> 
                        <td>40308146</td> 
                        <td>SF30-fa</td>
                        </tr>
                    <tr><td>Abdoul Kone</td> 
                        <td>40307505</td> 
                        <td>osrlazlo</td>
                        </tr>
                    <tr><td>Ryan Abdalla</td> 
                        <td>40243555</td> 
                        <td>rayanabdalla</td>
                        </tr>
                    <tr><td>Abderraouf El Khalil Karoun</td> 
                        <td>40315753</td> 
                        <td>Khalil-Krn</td>
                        </tr>
                    <tr><td>Madona Beshara</td> 
                        <td>4031664</td> 
                        <td>madonabeshara5-ui</td>
                        </tr>
                    <tr><td>Mbog Wendy</td> 
                        <td>40259455</td> 
                        <td>wenm983</td>
                        </tr>
                    <tr><td>Etienne Vorms</td> 
                        <td>40286823</td> 
                        <td>Tinou-code</td>
                        </tr>
                    <tr><td>Ibrahim Ahmad</td> 
                        <td>40279224</td> 
                        <td>ibrahimrocks</td>
                        </tr>
                        </tbody>
                </table>
            </div>
            </div>
            <Footer/>
        </div>
    </div>
    )
}