import "./DashboardNav.css";
import { useState, useEffect } from "react";
import { getMe } from "../../Repos/AccountRepo";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
    const [state, SetState] = useState("Home");
    const [username, SetUsername] = useState("Guest");
    const [thumbnail, SetThumbnail] = useState("OwlMigo_Beret.jpg");
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUsername = async () => {
            const response = await getMe();

            SetUsername(response.username);
            SetThumbnail(response.thumbnail);
        }
        fetchUsername();

    }, []);

    const handleNavToHome = (e) => {
        e.preventDefault();
        SetState("Home");
        navigate("/Dashboard");
    }

    const handleNavToProfile = (e) => {
        e.preventDefault();
        SetState("Profile");
        navigate(`/Dashboard/Profile/${username}`);
    }

    const handleNavToLetters = (e) => {
        e.preventDefault();
        SetState("Letters");
        navigate("/Dashboard/Letters");
    }

    const handleNavToSearch = (e) => {
        e.preventDefault();
        SetState("Search");
        navigate("/Dashboard/Search");
    }

    return (
        <div className="component-dbnav">
            <div className="dbnav-column">
                    <span className="logo-text">OwlMigo</span>
                </div>
                <div className="dbnav-column">
                    <div className={state === "Home" ? "dbnav-link-active" : "dbnav-link"} onClick={(e) => {handleNavToHome(e)}}>
                        <span class="material-icons-round dbnav-link-icon">
                            home
                        </span>
                        Home
                    </div>
                    <div className={state === "Profile" ? "dbnav-link-active" : "dbnav-link"} onClick={(e) => {handleNavToProfile(e)}}>
                        <span class="material-icons-round dbnav-link-icon">
                            account_circle
                        </span> 
                        Profile
                    </div>
                    <div className={state === "Letters" ? "dbnav-link-active" : "dbnav-link"} onClick={(e) => {handleNavToLetters(e)}}>
                        <span class="material-icons-round dbnav-link-icon">
                            email
                        </span>
                        Letters
                    </div>
                    <div className={state === "Search" ? "dbnav-link-active" : "dbnav-link"} onClick={(e) => {handleNavToSearch(e)}}>
                        <span class="material-icons-round dbnav-link-icon">
                            search
                        </span>
                        Search
                    </div>
                </div>
                <div className="dbnav-column">
                    <div className="dbnav-account-link">
                        <span className="dbnav-username">
                            {username}
                        </span>
                        <img src={`/Assets/Thumbnails/${thumbnail}`} className="dbnav-thumbnail"></img>
                    </div>
                </div>
        </div>
    )
}

export default DashboardNav;