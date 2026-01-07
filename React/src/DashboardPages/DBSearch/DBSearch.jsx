import "./DBSearch.css";
import { useState, useEffect, act } from 'react';
import { getInterests } from "../../Repos/InterestsRepo";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import countries from 'country-list';
import languages from 'iso-639-1';
import { SearchProfiles } from "../../Repos/ProfileRepo";
import { cleanGender, getCountryName, calculateAge, calculateLastLogin } from "../../Helpers/ProfileHelper";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function DBSearch() {
    const [loaded, SetLoaded] = useState(false);

    const [username, SetUsername] = useState("");
    const [gender, SetGender] = useState("Any");
    const [ageMin, SetAgeMin] = useState(null);
    const [ageMax, SetAgeMax] = useState(null);
    const [country, SetCountry] = useState("Any");
    const [language, SetLanguage] = useState("Any");
    const [fluency, SetFluency] = useState("Any");
    const [lookingFor, SetLookingFor] = useState("Any");
    const [interest, SetInterest] = useState("Any");
    const [active, SetActive] = useState(true);

    //Data for form
    const [countryData, SetCountriesData] = useState();
    const [languageData, SetLanguageData] = useState();
    const [fluencyData, SetFluencyData] = useState();
    const [interestData, SetInterestData] = useState();
    const [goalsData, SetGoalsData] = useState();

    const [resultsData, SetResultsData] = useState(null);
    const [errorMessage, SetErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Tighten up loose ends - Set variables left empty to correct data for API processing
        const uName = username.trim() === "" ? "Any" : username;
        const minAge = ageMin === null ? 0 : ageMin;
        const maxAge = ageMax === null ? 0 : ageMax;

        const results = await SearchProfiles(uName, gender, minAge, maxAge, country, language, fluency, lookingFor, interest, active);

        if (results.status === 200)
        {
            if (results.data.length !== 0)
            {
                SetResultsData(results.data);
            }
            else {
                SetResultsData(null);
                SetErrorMessage("No owls can be found with these filters");
            }
            
        }
        else {
            SetResultsData(null);
            SetErrorMessage(results.message);
        }

    }

    useEffect(() => {
        const countryDataArray = countries.getData();
        SetCountriesData(countryDataArray);

        const languageList = languages.getLanguages(languages.getAllCodes());
        SetLanguageData(languageList);

        const fluencyArray = ["Native", "Fluent", "Conversational", "Beginner"];
        SetFluencyData(fluencyArray);

        

        const goalArray = ["Friendship", "Romance", "Collaboration", "Language Exchange", "Culture Exchange"];
        SetGoalsData(goalArray);
        const fetchInterests = async () => {
            const response = await getInterests();
            
            SetInterestData(response);
            await new Promise(resolve => setTimeout(resolve, 1000)); //Fake delay for loading spinner testing
            SetLoaded(true);
        }
        fetchInterests();

    }, []);


    return (
        <>

        {loaded ? (

        <div className="dbpage-search">
            <div className="dbsearch-row">
                
                    <div className="dbsearch-card">
                        <div className="dbsearch-filters-container">
                            <div className="dbsearch-header">
                                Search for Owls
                            </div>
                            <div className="dbsearch-filters">

                                <div className="dbsearch-filter-column">
                                    <div className="dbsearch-filter">
                                        <label className="dbsearch-label">Username:</label>
                                        <input type="text" className="dbsearch-textinput" placeholder="any" value={username} onChange={(e) => {SetUsername(e.target.value)}}/>
                                    </div>
                                    <div className="dbsearch-filter">
                                        <label className="dbsearch-label">Gender:</label>
                                        <div className="dbsearch-options-box">
                                            <div className="dbsearch-option">
                                                <input type="radio" id="any" name="gender" value="Any" checked={gender === "Any"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="any" className="dbsearch-label-small">Any</label>
                                            </div>
                                            <div className="dbsearch-option">
                                                <input type="radio" id="male" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="male" className="dbsearch-label-small">Male</label>
                                            </div>
                                            <div className="dbsearch-option">
                                                <input type="radio" id="female" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="female" className="dbsearch-label-small">Female</label>
                                            </div>
                                            <div className="dbsearch-option">
                                                <input type="radio" id="nonbinary" name="gender" value="Nonbinary" checked={gender === "Nonbinary"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="nonbinary" className="dbsearch-label-small">Non-binary</label>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="dbsearch-filter">
                                        <label className="dbsearch-label">Age range:</label>
                                        <div className="dbsearch-agerange-container">
                                            <input type="number" className="dbsearch-numbinput" placeholder="min" min="0" max="99" value={ageMin} onChange={(e) => {SetAgeMin(e.target.value)}}/>
                                            -
                                            <input type="number" className="dbsearch-numbinput" placeholder="max"  min="0" max="99" value={ageMax} onChange={(e) => {SetAgeMax(e.target.value)}}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="dbsearch-filter-column">
                                    <div className="dbsearch-filter">
                                        <div className="dbsearch-country-container">
                                            <label className="dbsearch-label">Country:</label>
                                            <select className="dbsearch-dropdown-menu" value={country} onChange={(e) => {SetCountry(e.target.value)}}>
                                                <option value="Any">Any</option>

                                                {countryData.map((country) => (
                                                    <option value={country.code}>{country.name}</option>
                                                ))}

                                            </select>

                                        </div>
                                    </div>

                                    <div className="dbsearch-filter">
                                        <div className="dbsearch-language-container">
                                            <label className="dbsearch-label">Language:</label>
                                            <select className="dbsearch-dropdown-menu" value={language} onChange={(e) => {SetLanguage(e.target.value)}}>
                                                <option value="Any">Any</option>

                                                {languageData.map((language) => (
                                                    <option value={language.name}>{language.name}</option>
                                                ))}
                                            </select>
                                        
                                            <label className="dbsearch-label">Fluency:</label>
                                            <select className="dbsearch-dropdown-menu" value={fluency} onChange={(e) => {SetFluency(e.target.value)}}>
                                                <option value="Any">Any</option>

                                                {fluencyData.map((fluency) => (
                                                    <option value={fluency}>{fluency}</option>
                                                ))}
                                            </select>
                                        </div>                                       
                                    </div>

                                    <div className="dbsearch-filter">
                                        
                                        <div className="dbsearch-lookingfor-container">
                                            <label className="dbsearch-label">Looking for:</label>
                                            <select className="dbsearch-dropdown-menu" value={lookingFor} onChange={(e) => {SetLookingFor(e.target.value)}}>
                                                    <option value="Any">Any</option>

                                                    {goalsData.map((goal) => (
                                                        <option value={goal}>{goal}</option>
                                                    ))}
                                            </select>                            
                                        </div>
                                    </div>

                                    <div className="dbsearch-filter">
                                        <div className="dbsearch-interest-container">
                                            <label className="dbsearch-label">Interest:</label>
                                            <select className="dbsearch-dropdown-menu" value={interest} onChange={(e) => {SetInterest(e.target.value)}}>
                                                <option value="Any">Any</option>

                                                {interestData.map((interest) => (
                                                    <option value={interest.name}>{interest.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="dbsearch-button-container">
                                <div className="dbsearch-onlinefilter">
                                    <input type="checkbox" id="online" className="dbsearch-checkbox" checked={active} onChange={(e) => SetActive(e.target.checked)}/>
                                    <label htmlFor="online" className="dbsearch-label-small">Only show recently active owls</label>
                                </div>
                                <button type="button" className="dbsearch-button" onClick={(e) => {handleSubmit(e)}}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* display search results */}
                <div className="dbsearch-row">
                    <div className="dbsearch-results-container">
                        
                        {resultsData !== null ? 
                        <div className="dbsearch-results-notif">
                            {`${resultsData.length} results found`}
                        </div> :
                        ""
                        }

                        {resultsData !== null ? resultsData.map((profile) => (
                            <Link to={`/Dashboard/Profile/${profile.username}`} className="dbsearch-link">
                                <div className="dbsearch-result-card">
                                    <div className="dbsearch-thumb-container">
                                        <img className="dbsearch-thumbnail" alt={profile.thumbnail} src={`/Assets/Thumbnails/${profile.thumbnail}`}/>
                                        <div className="dbsearch-lastlog-container">
                                            <span className={calculateLastLogin(profile.lastLogin) === "Online" ? "dbprof-lastlogin-online" : "dbprof-lastlogin-offline"}>{calculateLastLogin(profile.lastLogin)}</span>
                                        </div>
                                    </div>
                                    <div className="dbsearch-header-container">
                                        <div className="dbsearch-username-container">
                                            {profile.username}, <span className="dbsearch-agegender">{calculateAge(profile.dateOfBirth)}{cleanGender(profile.gender)}</span>
                                        </div>
                                        <div className="dbsearch-name-container">
                                            {profile.firstName} {profile.lastName}
                                        </div>
                                        <div className="dbsearch-country-container">
                                            <ReactCountryFlag countryCode={profile.country} svg style={{width: '2em', height: '1em'}}/>
                                            {getCountryName(profile.country)}
                                        </div>
                                        <div className="dbsearch-goals-container">
                                            <div className="dbprof-goals-header">
                                                Looking for:
                                            </div>
                                            <div className="dbsearch-goals">
                                                {profile.goals.map((goal) => (
                                                    <div className="dbsearch-goal">{goal.name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )) : <div className="dbsearch-results-message">{errorMessage}</div>}

                    </div>
                </div>           
            </div>
        

        ) : (<div className="dbpage-search">
            <div className="dbsearch-spinner-container">
                <LoadingSpinner/>
            </div>     
        </div>)}
        </>
    )
}

export default DBSearch;