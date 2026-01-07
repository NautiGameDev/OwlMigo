import "./Dashboard.css";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import { Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div className="page-dashboard">
            <DashboardNav/>
            <div className="dashboard-content-area">
                <Outlet/>
            </div>
            
        </div>
    )
}

export default Dashboard;