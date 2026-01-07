import "./Inbox.css";
import { useState } from "react";

function Inbox({inbound, outbound, selectLetter}) {
    const [pageState, SetPageState] = useState("inbound");


    return (
        <>
            <div className="dbletters-button-container">
                <button className={pageState === "inbound" ? "dbletters-button-toggled" : "dbletters-button"} onClick={(e) => {SetPageState("inbound")}}>
                    Inbound
                </button>

                <button className={pageState === "outbound" ? "dbletters-button-toggled" : "dbletters-button"} onClick={(e) => {SetPageState("outbound")}}>
                    Outbound
                </button>
            </div>
            <div className="dbletters-table-container">
                {pageState === "inbound" ? (
                <table className="dbletters-table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Subject</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inbound.map((letter) => (
                            <tr className="dbletters-table-row" key={letter.id} onClick={(e) => {selectLetter(letter)}}>
                                <td className="inbox-to-col">{letter.senderName}</td>
                                <td className="inbox-subject-col">{letter.subject}</td>
                                <td className="inbox-date-col">{new Date(letter.timeSent).toLocaleDateString()}</td>
                            </tr>
                        ))}                                    
                    </tbody>
                </table>
                ) : (
                <table className="dbletters-table">
                    <thead>
                        <tr>
                            <th>To</th>
                            <th>Subject</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outbound.map((letter) => (
                            <tr className="dbletters-table-row" key={letter.id} onClick={(e) => {selectLetter(letter)}}>
                                <td className="inbox-to-col">{letter.receiverName}</td>
                                <td className="inbox-subject-col">{letter.subject}</td>
                                <td className="inbox-date-col">{new Date(letter.timeSent).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                

            </div>
        </>
    )
}

export default Inbox;