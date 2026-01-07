import Inbox from "../../Components/Inbox/Inbox";
import Letter from "../../Components/Letter/Letter";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { GetInbound, GetOutbound } from "../../Repos/LetterRepo";
import "./DBLetters.css";
import { useState, useEffect } from "react";

function DBLetters() {
    //const [pageState, SetPageState] = useState("inbound");
    const [loading, SetLoading] = useState(true);

    const [inbound, SetInbound] = useState();
    const [outbound, SetOutbound] = useState();

    const [letter, SetLetter] = useState();

    useEffect(() => {
        const fetchLetters = async () => {
            const inboundLetters = await GetInbound();

            if (inboundLetters.status === 200)
            {
                SetInbound(inboundLetters.data);
            }
            else {
                alert(`Error ${inboundLetters.status}: ${inboundLetters.message}`);
            }

            const outboundLetters = await GetOutbound();

            if (outboundLetters.status === 200)
            {
                SetOutbound(outboundLetters.data);
            }
            else {
                alert(`Error ${outboundLetters.status}: ${outboundLetters.message}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000)); //Fake delay for loading spinner testing
            SetLoading(false);            
        }

        fetchLetters();
    }, [])

    return (
        <div className="dbpage-letters">
            {loading ? (<div className="dbletters-loading-container"><LoadingSpinner/></div>) : (
                <div className="dbletters-row">
                    <div className="dbletters-card">
                        <div className="dbletters-header">
                            Letters
                        </div>
                        {letter ? (
                            <Letter letter={letter} goBack={SetLetter}/>
                        ) : (
                            <Inbox inbound={inbound} outbound={outbound} selectLetter={SetLetter}/>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default DBLetters;