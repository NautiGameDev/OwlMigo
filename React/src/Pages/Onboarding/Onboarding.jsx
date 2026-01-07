import "./Onboarding.css"
import { useState, useEffect } from "react";
import { getMe } from "../../Repos/AccountRepo";
import { getInterests } from "../../Repos/InterestsRepo";
import { CreateProfile } from "../../Repos/ProfileRepo";
import { PostLanguages } from "../../Repos/ProfileToLanguageRepo";
import { PostGoals } from "../../Repos/ProfileToGoalRepo";
import { PostInterests } from "../../Repos/ProfileToInterestRepo";
import { useNavigate } from "react-router-dom";
import countries from 'country-list';
import languages from 'iso-639-1';
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

function Onboarding() {
    const [currentSlide, SetSlide] = useState(0);
    const [username, SetUsername] = useState("");
    const [loadingText, SetLoadingText] = useState("Connecting to API...");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            const response = await getMe();
            SetUsername(response.username);       
        }
        fetchUsername();

        const fetchInterests = async () => {
            const response = await getInterests();
            
            SetInterests(response);
        }
        fetchInterests();
    },[])
    
    

    //Data for seeding forms
    const countryDataArray = countries.getData();
    const cleanCountryName = (name) => {
        return name.replace(/\s*\(.*?\)\s*/g, '').trim();
    }
    const languageList = languages.getLanguages(languages.getAllCodes());
    const languageFluency = ["Native", "Fluent", "Conversational", "Beginner"];
    const thumbList = ["OwlMigo_Bard.jpg", "OwlMigo_Beret.jpg", "OwlMigo_Chef.jpg", "OwlMigo_Chef2.jpg", "OwlMigo_Crafter.jpg", "OwlMigo_Gamer.jpg", "OwlMigo_Gardner.jpg", "OwlMigo_Navigator.jpg", "OwlMigo_Painter.jpg", "OwlMigo_Scholar.jpg", "OwlMigo_Student.jpg", "OwlMigo_Tech.jpg", "OwlMigo_Travel.jpg", "OwlMigo_Zen.jpg"];
    const [interests, SetInterests] = useState([]); //Fetches interests from database to populate final slide

    //Profile Data
    const [firstName, SetFirstname] = useState("");
    const [lastName, SetLastName] = useState("");
    const [hideName, SetHideName] = useState(false);
    const [dob, SetDob] = useState("YYYY-MM-DD");
    const [country, SetCountry] = useState("");
    const [gender, SetGender] = useState("Male");

    //Languages
    const [languagesNumb, SetLanguagesNumb] = useState(1);
    const [languageOne, SetLanguageOne] = useState("");
    const [languageOneFluency, SetLanguageOneFluency] = useState("");
    const [languageTwo, SetLanguageTwo] = useState("");
    const [languageTwoFluency, SetLanguageTwoFluency] = useState("");
    const [languageThree, SetLanguageThree] = useState("");
    const [languageThreeFluency, SetLanguageThreeFluency] = useState("");
    
    //Looking for variables
    const [friendship, SetFriendship] = useState(true);
    const [romance, SetRomance] = useState(false);
    const [collab, SetCollab] = useState(false);
    const [languageEx, SetLanguageEx] = useState(false);
    const [cultureEx, SetCultureEx] = useState(false);
    const [hideRomance, SetHideRomance] = useState(false);

    //About you
    const [thumbnail, SetThumbnail] = useState("OwlMigo_Beret.jpg");
    const [bio, SetBio] = useState("");

    const [chosenInterests, SetChosenInterests] = useState([]);

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        //Conditions to proceed - all must be true
        let firstNameValid = false;
        let lastNameValid = false;
        let dobValid = false;
        let countryValid = false;
        let languagesValid = false;

        //Grab error containers to display messages
        const firstNameError = document.getElementById("first-name-error");
        const lastNameError = document.getElementById("last-name-error");
        const dobError = document.getElementById("dob-error");
        const countryError = document.getElementById("country-error");
        const languageError = document.getElementById("language-error");

        //Check first name
        if (firstName.trim() === "")
        {            
            firstNameError.textContent = "First name required";
        }
        else
        {
            firstNameError.textContent = "";
            firstNameValid = true;
        }

        //Check last name
        if (lastName.trim() === "")
        {
            lastNameError.textContent = "Last name required";
        }
        else
        {
            lastNameError.textContent = "";
            lastNameValid = true;
        }

        if (dob === "YYYY-MM-DD")
        {
            dobError.textContent = "Date of birth required"
        }
        else
        {
            dobError.textContent = "";
            dobValid = true;
        }

        if (country.trim() === "")
        {
            countryError.textContent = "Country required";
        }
        else
        {
            countryError.textContent = "";
            countryValid = true;
        }

        if (languageOne.trim() === "" || languageOneFluency.trim() === "")
        {
            languageError.textContent = "Language required"
        }
        else
        {
            languageError.textContent = "";
            languagesValid = true;
        }

        if (firstNameValid && lastNameValid && dobValid && countryValid && languagesValid)
        {
            SetSlide(2);
        }

    }


    /* Handles toggling interest when user chooses to select/deselct interest
        interest buttons have the id (matching database) stored as key, which is passed in to add/remove from array
        When user submits the entire onboarding form, the array is sent to the api in order to populate the join table with user's selected interests
    */
    const handleInterestToggle = (id) => {
        SetChosenInterests((prevInterests) => {
            if (prevInterests.includes(id)) {
                return prevInterests.filter(interestId => interestId !== id);
            }
            else {
                return [...prevInterests, id];
            }
        })
    }
    

    const handlePostingDataToApi = async (e) => {
        e.preventDefault();

        SetSlide(4);

        //Handle basic profile
        SetLoadingText("Creating profile...");
        const profResponse = await CreateProfile(firstName, lastName, dob, country, gender, thumbnail, bio, hideRomance, hideName);

        if (profResponse.status !== 200) {
            SetLoadingText(`Error creating profile: ${profResponse.message}`);
            return;
        }

        //Handle interests
        SetLoadingText("Appending interests to profile...");
        const interestsResponse = await PostInterests(chosenInterests);

        if (interestsResponse.status !== 200) {
            SetLoadingText(`Error appending interests: ${interestsResponse.message}`);
            return;
        }

        //Handle "looking for"
        SetLoadingText("Appending goals to profile...");
        const goalsArray = [];

        if (friendship) {
            goalsArray.push(1);
        }
        if (romance) {
            goalsArray.push(2);
        }
        if (languageEx) {
            goalsArray.push(3);
        }
        if (cultureEx) {
            goalsArray.push(4);
        }
        if (collab) {
            goalsArray.push(5);
        }

        if (goalsArray.length > 0) {
            const goalsResponse = await PostGoals(goalsArray);

            if (goalsResponse.status !== 200) {
                SetLoadingText(`Error appending goals: ${goalsResponse.message}`);
                return;
            }
        }

        //Languages
        SetLoadingText("Appending languages to profile...");
        const languageArray = [];

        if (languageOne !== "" && languageOneFluency !== "") {
            const firstLang = {language: languageOne, level: languageOneFluency};
            languageArray.push(firstLang);
        }

        if (languagesNumb > 1 && languageTwo !== "" && languageTwoFluency !== "") {
            const secondLang = {language: languageTwo, level: languageTwoFluency};
            languageArray.push(secondLang);
        }

        if (languagesNumb > 2 && languageThree !== "" && languageThreeFluency !== "") {
            const thirdLang = {language: languageThree, level: languageThreeFluency};
            languageArray.push(thirdLang);
        }

        if (languageArray.length > 0) {
            const langResponse = await PostLanguages(languageArray);

            if (langResponse.status !== 200) {
                SetLoadingText(`Error appending languages: ${langResponse.message}`);
                return;
            }
            else {
                SetLoadingText("Profile successfully created!");
                await new Promise(resolve => setTimeout(resolve, 1000)); //Fake delay for loading spinner testing
                navigate("/Dashboard");
            }
        }        
    }

    return (
        <div className="page-onboarding">

            {/* Welcome Card */}
            {currentSlide === 0 && (
                <div className="onboarding-card">
                    <h1 className="onboarding-header">Welcome, {username}</h1>
                    <div className="onboarding-welcome-row">
                        Welcome to <span className="onboarding-emphasis">OwlMigo</span> - the peaceful corner of the internet where real, thoughtful connections still take time.
                    </div>
                    <div className="onboarding-welcome-row">
                        We're excited to help you find meaningful pen pals and language exchange friends around the world.
                    </div>
                    <div className="onboarding-welcome-row">
                        Just a few quick steps to set up your profile and get your nest started.
                    </div>
                    <div className="onboarding-welcome-row onboarding-welcome-extramarg">
                        Ready? Let's <span className="onboarding-emphasis">begin!</span>
                    </div>
                    <div className="onboarding-welcome-row">
                        <button type="button" className="onboarding-button" onClick={(e) => {SetSlide(1)}}>Start</button>
                    </div>
                </div>
            )}

            {/* Set-up profile card */}
            {currentSlide === 1 && (
                <div className="onboarding-card">
                    <h1 className="onboarding-header">Set up Your Profile</h1>
                    <div className="onboarding-info-row">
                        Take a moment to create a profile that reflects the real you.
                    </div>
                        <div className="onboarding-form-container">
                            <form>

                                {/* First and Last names */}
                                <div className="onboarding-input-row">
                                    <div className="onboarding-input-column">
                                        <label htmlFor="first-name" className="onboarding-label">First Name:*</label>
                                        <input type="text" className="onboarding-input" id="first-name" placeholder="Enter first name" value={firstName} onChange={(e) => {SetFirstname(e.target.value)}}/>
                                        <div className="onboarding-error-container" id="first-name-error"></div>
                                    </div>
                                    <div className="onboarding-input-column">
                                        <label htmlFor="last-name" className="onboarding-label">Last Name:*</label>
                                        <input type="text" className="onboarding-input" id="last-name" placeholder="Enter last name" value={lastName} onChange={(e) => {SetLastName(e.target.value)}}/>
                                        <div className="onboarding-error-container" id="last-name-error"></div>
                                    </div>
                                </div>

                                {/* Option to hide name from profile */}
                                <div className="onboarding-input-row">
                                    <div className="onboarding-input-column">
                                        <div className="onboarding-container-attention">
                                            <input type="checkbox" id="hide-name" className="onboarding-checkbox" name="isHidden" checked={hideName} onChange={(e) => {SetHideName(e.target.checked)}}></input>
                                            <label htmlFor="hide-name" className="onboarding-label-small onboarding-label-attention">Hide real name from other users?</label>
                                        </div>
                                    </div>

                                {/* Gender Selection */}
                                    <div className="onboarding-input-column">
                                        <label htmlFor="gender" className="onboarding-label">Gender:</label>
                                        <div className="onboarding-gender-container">
                                            <div className="onboarding-gender-option">
                                                <input type="radio" id="male" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="male" className="onboarding-label-small">Male</label>
                                            </div>
                                            
                                            <div className="onboarding-gender-option">
                                                <input type="radio" id="female" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="female" className="onboarding-label-small">Female</label>
                                            </div>

                                            <div className="onboarding-gender-option">
                                                <input type="radio" id="non-binary" name="gender" value="NonBinary" checked={gender === "NonBinary"} onChange={(e) => {SetGender(e.target.value)}}/>
                                                <label htmlFor="non-binary" className="onboarding-label-small">Non-Binary</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Date of Birth and Country selections */}
                                <div className="onboarding-input-row">
                                    <div className="onboarding-input-column">
                                        <label className="onboarding-label" htmlFor="dob">Date of Birth:*</label>
                                        <input type="date" className="onboarding-input" id="dob" value={dob} onChange={(e) => {SetDob(e.target.value)}}></input>
                                        <div className="onboarding-error-container" id="dob-error"></div>
                                    </div>
                                    <div className="onboarding-input-column">
                                        <label htmlFor="country" className="onboarding-label">Country:*</label>
                                        <select id="country" className="onboarding-dropdown-menu" value={country} onChange={(e) => {SetCountry(e.target.value)}}>
                                            <option value="" disabled>Select a country</option>

                                            {/* Pull countries from country-list package to seed the dropdown menu */}
                                            {countryDataArray.map((data) => (
                                                <option key={data.code} value={data.code}>{cleanCountryName(data.name)}</option>
                                            ))}

                                        </select>
                                        <div className="onboarding-error-container" id="country-error"></div>
                                    </div>
                                    
                                </div>

                                {/* Language and fluency options
                                {/* User clicks add/remove buttons to change amount of language options available (Min: 1 - Max: 3 */}
                                {/* When the add/remove buttons are clicked, the useState constant languagesNumb is adjusted accordingly. */}
                                {/* Buttons Appear and Disappear based on the number of langues the user adds/removes */}
                                <div className="onboarding-input-row">
                                    <div className="onboarding-input-column">
                                        <label htmlFor="languages" className="onboarding-label">Languages:*</label>

                                        <div className="onboarding-languages-container">
                                            <select className="onboarding-dropdown-menu" value={languageOne} onChange={(e) => {SetLanguageOne(e.target.value)}}>
                                                <option value="" disabled>Select a language</option>

                                                {languageList.map((language) => (
                                                    <option value={language.name}>{language.name}</option>
                                                ))}
                                            </select>
                                            
                                            <select className="onboarding-dropdown-menu" value={languageOneFluency} onChange={(e) => {SetLanguageOneFluency(e.target.value)}}>
                                                <option value="" disabled>Select Fluency</option>

                                                {languageFluency.map((fluency) => (
                                                    <option value={fluency}>{fluency}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {languagesNumb >= 2 ? (
                                            <div className="onboarding-languages-container">
                                            <select className="onboarding-dropdown-menu" value={languageTwo} onChange={(e) => {SetLanguageTwo(e.target.value)}}>
                                                <option value="" disabled>Select a language</option>

                                                {languageList.map((language) => (
                                                    <option value={language.name}>{language.name}</option>
                                                ))}
                                            </select>
                                            
                                            <select className="onboarding-dropdown-menu" value={languageTwoFluency} onChange={(e) => {SetLanguageTwoFluency(e.target.value)}}>
                                                <option value="" disabled>Select Fluency</option>

                                                {languageFluency.map((fluency) => (
                                                    <option value={fluency}>{fluency}</option>
                                                ))}
                                            </select>
                                        </div>
                                        ) : ""}

                                        {languagesNumb == 3 ? (
                                            <div className="onboarding-languages-container">
                                            <select className="onboarding-dropdown-menu" value={languageThree} onChange={(e) => {SetLanguageThree(e.target.value)}}>
                                                <option value="" disabled>Select a language</option>

                                                {languageList.map((language) => (
                                                    <option value={language.name}>{language.name}</option>
                                                ))}
                                            </select>
                                            
                                            <select className="onboarding-dropdown-menu" value={languageThreeFluency} onChange={(e) => {SetLanguageThreeFluency(e.target.value)}}>
                                                <option value="" disabled>Select Fluency</option>

                                                {languageFluency.map((fluency) => (
                                                    <option value={fluency}>{fluency}</option>
                                                ))}
                                            </select>
                                        </div>
                                        ) : ""}

                                        <div className="onboarding-input-row">
                                            <div className="onboarding-input-column onboarding-btn-container">
                                                {languagesNumb > 1 ? (
                                                    <button type="button" className="onboarding-button-sm" onClick={() => {SetLanguagesNumb(languagesNumb - 1)}}>Remove</button>
                                                ) : " "}
                                            </div>
                                            <div className="onboarding-input-column onboarding-btn-container">
                                                {languagesNumb < 3 ? (
                                                    <button type="button" className="onboarding-button-sm" onClick={() => {SetLanguagesNumb(languagesNumb + 1)}}>Add</button>
                                                ) : " "}
                                            </div>
                                        </div>
                                        <div className="onboarding-error-container" id="language-error"></div>
                                        

                                    </div>

                                    {/* Looking for options with additional check box to hide profile from romance seeking users for privacy/safety of users */}
                                    <div className="onboarding-input-column">
                                        <label htmlFor="goals" className="onboarding-label">Looking for:</label>
                                        <div className="onboarding-goal-container">
                                            <div className="onboarding-goal-option">
                                                <input type="checkbox" id="friendship" className="onboarding-checkbox" checked={friendship} onChange={(e) => {SetFriendship(e.target.checked)}}></input>
                                                <label htmlFor="friendship" className="onboarding-label-small">Friendship</label>
                                            </div>

                                            <div className="onboarding-goal-option">
                                                <input type="checkbox" id="romance" className="onboarding-checkbox" checked={romance} onChange={(e) => {SetRomance(e.target.checked)}}></input>
                                                <label htmlFor="romance" className="onboarding-label-small">Romance</label>
                                            </div>

                                            <div className="onboarding-goal-option">
                                                <input type="checkbox" id="collab" className="onboarding-checkbox" checked={collab} onChange={(e) => {SetCollab(e.target.checked)}}></input>
                                                <label htmlFor="collab" className="onboarding-label-small">Collaboration</label>
                                            </div>
                                        </div>
                                        <div className="onboarding-goal-container">

                                            <div className="onboarding-goal-option">
                                                <input type="checkbox" id="language-exchange" className="onboarding-checkbox" checked={languageEx} onChange={(e) => {SetLanguageEx(e.target.checked)}}></input>
                                                <label htmlFor="language-exchange" className="onboarding-label-small">Language Exchange</label>
                                            </div>

                                            <div className="onboarding-goal-option">
                                                <input type="checkbox" id="cultural-exchange" className="onboarding-checkbox" checked={cultureEx} onChange={(e) => {SetCultureEx(e.target.checked)}}></input>
                                                <label htmlFor="cultural-exchange" className="onboarding-label-small">Cultural Exchange</label>
                                            </div>
                                        </div>
                                        <div className="onboarding-goal-container">
                                            <div className="onboarding-goal-option onboarding-container-attention">
                                                <input type="checkbox" id="hide-romance" className="onboarding-checkbox" checked={hideRomance} onChange={(e) => {SetHideRomance(e.target.checked)}}></input>
                                                <label htmlFor="hide-romance" className="onboarding-label-small onboarding-label-attention">Hide profile from anyone seeking romance?</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="onboarding-input-row">
                                    <div className="onboarding-input-column onboarding-btn-container">
                                            <button type="button" className="onboarding-button" onClick={(e) => {SetSlide(0)}}>Back</button>
                                    </div>

                                    <div className="onboarding-input-column onboarding-btn-container">
                                        <button type="button" className="onboarding-button" onClick={(e) => {handleProfileSubmit(e)}}>Next</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            )}

            {/* Bio and thumbnail set up */}
            {currentSlide === 2 && (
                <div className="onboarding-card">
                    <h1 className="onboarding-header">About You</h1>
                    <div className="onboarding-info-row">
                        Tell us a little bit about yourself.
                    </div>
                    <div className="onboarding-input-row">
                        <div className="onboarding-input-column">
                            <div className="onboarding-bio-container">
                                <label className="onboarding-label">Bio:</label> <span className="onboarding-label-attention">{"(Max: 500 characters)"}</span>
                                <textarea className="onboarding-bio-input" placeholder="Tell everyone about yourself..." value={bio} maxLength={500} onChange={(e) => {SetBio(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="onboarding-input-column">
                            <label className="onboarding-label">Profile Image:</label>
                            <div className="onboarding-thumbnail-container">
                                {thumbList.map((path) => (
                                    <img className={thumbnail === path ? "onboarding-thumbnail-selected" : "onboarding-thumbnail"} key={path} src={`./public/Assets/Thumbnails/${path}`} onClick={(e) => {SetThumbnail(path)}}/>
                                ))};
                            </div>
                        </div>
                    </div>
                     <div className="onboarding-input-row">
                        <div className="onboarding-input-column onboarding-btn-container">
                                <button type="button" className="onboarding-button" onClick={(e) => {SetSlide(1)}}>Back</button>
                        </div>

                        <div className="onboarding-input-column onboarding-btn-container">
                            <button type="button" className="onboarding-button" onClick={(e) => {SetSlide(3)}}>Next</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Interest Selection */}
            {currentSlide === 3 && (
                <div className="onboarding-card">
                    <h1 className="onboarding-header">Interests</h1>
                    <div className="onboarding-info-row">
                        Help find meaningful connections by selecting your interests
                    </div>
                    <div className="onboarding-interests-container">
                        {interests.map((interest) => (
                            <div 
                                className={chosenInterests.includes(interest.id) ? "onboarding-interests-selected" : "onboarding-interest"} 
                                key={interest.id} 
                                onClick={(e) => {handleInterestToggle(interest.id)}}
                            >
                                {interest.name}
                            </div>
                        ))}
                    </div>
                    <div className="onboarding-input-row">
                        <div className="onboarding-input-column onboarding-btn-container">
                                <button type="button" className="onboarding-button" onClick={(e) => {SetSlide(2)}}>Back</button>
                        </div>

                        <div className="onboarding-input-column onboarding-btn-container">
                            <button type="button" className="onboarding-button" onClick={(e) => {handlePostingDataToApi(e)}}>Finish</button>
                        </div>
                    </div>
                </div>
            )}
        

            {/* Loading page */}
            {currentSlide == 4 && (
                <div className="onboarding-loading-slide">
                    <LoadingSpinner/>
                </div>
            )}
        </div>
    )
}

export default Onboarding;