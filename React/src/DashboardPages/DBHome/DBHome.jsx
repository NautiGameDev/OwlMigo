import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import "./DBHome.css";

function DBHome() {

    return (
        <div className="dbpage-home">
            <div className="dbhome-temp">
                <LoadingSpinner/>
            </div>
        </div>
    )
}


export default DBHome;
