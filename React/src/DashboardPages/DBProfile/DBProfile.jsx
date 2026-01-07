import "./DBProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMe } from "../../Repos/AccountRepo";
import { getProfileByUsername } from "../../Repos/ProfileRepo";
import ReactCountryFlag from "react-country-flag";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { cleanGender, getCountryName, calculateAge, calculateLastLogin } from "../../Helpers/ProfileHelper";

function DBProfile() {
    const navigate = useNavigate();

    const [myUsername, SetMyUsername] = useState("");
    const [loading, SetLoading] = useState(true);
    const { username } = useParams();
    const [profile, SetProfile] = useState();

    const [lastLog, SetLastLog] = useState("Unknown");

    useEffect(() => {

         const loadAllData = async () => {
                const meResponse = await getMe();

                if (meResponse.status !== 200)
                {
                    alert(meResponse.message);
                    return;
                }

                SetMyUsername(meResponse.username);

                const profResponse = await getProfileByUsername(username);

                if (profResponse.status !== 200)
                {
                    alert(profResponse.message);
                    return;
                }                

                SetProfile(profResponse.data);
                const userStatus = calculateLastLogin(profResponse.data.lastLogin);
                SetLastLog(userStatus);

                await new Promise(resolve => setTimeout(resolve, 1000)); //Fake delay for loading spinner testing
                SetLoading(false);

            }

        loadAllData();


    }, [username]);

    

    return (
        <>
            {loading === false ? (
                <div className="dbpage-profile">
                    <div className="dbprof-row">
                        <div className="dbprof-subrow">
                        <div className="dbprof-card">
                            <div className="dbprof-thumb-container">
                                <img className="dbprof-thumbnail" alt={profile.thumbnail} src={`/Assets/Thumbnails/${profile.thumbnail}`}/>
                                <div className="dbprof-lastlog-container">
                                    <span className={lastLog === "Online" ? "dbprof-lastlogin-online" : "dbprof-lastlogin-offline"}>{lastLog}</span>
                                </div>
                            </div>
                            <div className="dbprof-header-container">
                                <div className="dbprof-username-container">
                                    {username}, <span className="dbprof-agegender">{calculateAge(profile.dateOfBirth)}{cleanGender(profile.gender)}</span>
                                </div>
                                <div className="dbprof-name-container">
                                    {profile.firstName} {profile.lastName}
                                </div>
                                <div className="dbprof-country-container">
                                    <ReactCountryFlag countryCode={profile.country} svg style={{width: '2em', height: '1em'}}/>
                                    {getCountryName(profile.country)}
                                </div>
                                <div className="dbprof-goals-container">
                                    <div className="dbprof-goals-header">
                                        Looking for:
                                    </div>
                                    <div className="dbprof-goals">
                                        {profile.goals.map((goal) => (
                                            <div className="dbprof-goal">{goal.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="dbprof-message-container">
                                { myUsername != username ?  (
                                    <button type="button" className="dbprof-message-btn" onClick={(e) => (navigate(`/Dashboard/Write/${username}`))}>
                                        <span class="material-icons-round dbnav-link-icon">
                                            email
                                        </span>
                                        Send Letter
                                    </button>
                                    ) : ""
                                }
                                    
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="dbprof-row">
                        <div className="dbprof-subrow">
                            <div className="dbprof-column">
                                    <div className="dbprof-card">
                                        <div className="dbprof-about-container">
                                            <div className="dbprof-header">
                                                About Me:
                                            </div>
                                            <div className="dbprof-aboutme">
                                                {profile.bio}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="dbprof-column">
                                <div className="dbprof-card">
                                    <div className="dbprof-interests-container">
                                        <div className="dbprof-header">
                                            Interests:
                                        </div>
                                        <div className="dbprof-interests">
                                            {profile.interests.map((interest) => (
                                                <div className="dbprof-interest">
                                                    {interest.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dbprof-row">
                        <div className="dbprof-subrow">
                            <div className="dbprof-column">
                                    <div className="dbprof-card">
                                        <div className="dbprof-about-container">
                                            <div className="dbprof-header">
                                                Connections:
                                            </div>
                                            <div className="dbprof-connections">
                                                Coming soon
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="dbprof-column">
                                <div className="dbprof-card">
                                    <div className="dbprof-interests-container">
                                        <div className="dbprof-header">
                                            Languages:
                                        </div>
                                        <div className="dbprof-languages">
                                            {profile.languages.map((language) => (
                                                <div className="dbprof-language">
                                                    <span className="dbprof-lang-name">{language.name}</span> - {language.level}
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
            <div className="dbpage-profile">
                <div className="dbprof-spinner-container">
                    <LoadingSpinner/>
                </div>                
            </div>
        )}   

        </>)
}

export default DBProfile;