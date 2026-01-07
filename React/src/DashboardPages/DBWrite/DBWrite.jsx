import { useNavigate, useParams } from "react-router-dom";
import "./DBWrite.css";
import { useState, useEffect } from "react";
import { getMe } from "../../Repos/AccountRepo";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { CreateLetter } from "../../Repos/LetterRepo";

function DBWrite() {
    const {username} = useParams();

    const [subject, SetSubject] = useState("");
    const [content, SetContent] = useState("");
    const [author, SetAuthor] = useState("");

    const [sending, SetSending] = useState(false);
    const [loading, SetLoading] = useState(true);
    const [loadMessage, SetLoadMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getAuthor = async () => {
            const response = await getMe();

            if (response.status === 200)
            {
                SetAuthor(response.username);
            }
        }

        getAuthor();
    },[]);

    const handleSend = async (e) => {
        e.preventDefault();

        SetSending(true);
        SetLoading(true);

        const subjectError = document.getElementById("subject-error");
        const contentError = document.getElementById("content-error");

        if (subject.trim() === "")
        {
            subjectError.textContent = "Subject required";
            return;
        }
        else {
            subjectError.textContent = "";
        }

        if (content.trim() === "")
        {
            contentError.textContent = "Letter content required";
            return;
        }
        else {
            contentError.textContent = "";
        }

        const response = await CreateLetter(username, author, subject, content);

        const loadingContainer = document.getElementById("loading-container");

        if (response.status !== 200)
        {
            await new Promise(resolve => setTimeout(resolve, 1000));
            SetLoading(false);
            SetLoadMessage(`Error ${response.status}: ${response.message}`)
            await new Promise(resolve => setTimeout(resolve, 2000)); //Fake delay for loading spinner testing
            SetSending(false);
        }
        else
        {
            await new Promise(resolve => setTimeout(resolve, 1000));
            SetLoading(false);
            SetLoadMessage(`${response.message}`)
            await new Promise(resolve => setTimeout(resolve, 2000)); //Fake delay for loading spinner testing
            navigate(`/Dashboard/Profile/${username}`);
        }
        


    }

    return (
        <div className="dbpage-write">
            {!sending ? (<div className="dbwrite-row">
                <div className="dbwrite-card">
                    <div className="dbwrite-header">
                        Write a letter
                    </div>
                    <div className="dbwrite-recipient">
                        <span className="dbwrite-label">To:</span>{username}
                        
                    </div>
                    <div className="dbwrite-subject-container">
                        <label className="dbwrite-label" htmlFor="subject">Subject:</label>
                        <input type="text" className="dbwrite-input" id="subject" placeholder="Enter a subject" value={subject} onChange={(e) => {SetSubject(e.target.value)}}></input>
                    </div>
                    <div className="dbwrite-error-container" id="subject-error"></div>
                    <div className="dbwrite-textarea-container">
                        <label className="dbwrite-label" htmlFor="content">Letter:</label>
                        <div className="dbwrite-textarea-subcontainer">
                            <textarea type="text" className="dbwrite-textarea" placeholder="Enter a message" value={content} onChange={(e) => {SetContent(e.target.value)}}></textarea>
                        </div>
                        
                    </div>
                    <div className="dbwrite-error-container" id="content-error"></div>
                    <div className="dbwrite-button-container">
                        <button className="dbwrite-button" onClick={(e) => {handleSend(e)}}>Send</button>
                    </div>
                </div>
            </div> ) : 
            (<div className="dbwrite-spinner-container" id="loading-container">
                {loading ? (<LoadingSpinner/>) : (loadMessage)}
            </div>
        )}

        </div>
    )
}

export default DBWrite;