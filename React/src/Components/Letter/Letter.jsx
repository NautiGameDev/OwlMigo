import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Letter({letter, goBack}) {
    const navigate = useNavigate();

    return (
        <div className="dbletters-letter">
            <div className="letter-header">
                <span className="letter-label">To:</span><Link className="letter-link" to={`/Dashboard/Profile/${letter.receiverName}`}>{letter.receiverName}</Link>
            </div>
            <div className="letter-header">
                <span className="letter-label">From:</span><Link className="letter-link" to={`/Dashboard/Profile/${letter.senderName}`}>{letter.senderName}</Link>
            </div>
            <div className="letter-header">
                <span className="letter-label">Subject:</span>{letter.subject}
            </div>
            <div className="letter-header">
                <span className="letter-label">Date:</span>{new Date(letter.timeSent).toLocaleDateString()}
            </div>
            <div className="letter-content">
                {letter.content}
            </div>
            <div className="letter-buttons">
                <button className="dbletters-button" onClick={(e) => {goBack()}}>Close</button>
                <button className="dbletters-button-toggled" onClick={(e) => {navigate(`/Dashboard/Write/${letter.senderName}`)}}>Reply</button>
            </div>
        </div>
    )
}

export default Letter;