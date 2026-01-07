import { useState } from "react";
import "./Home.css"
import { postLogin } from "../../Repos/AccountRepo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const HandleLogin = async (e) => {
        e.preventDefault();
        
        const emailWarning = document.getElementById("email-error");
        const passwordWarning = document.getElementById("password-error");

        if (email.trim() === "") {
            emailWarning.textContent = "E-mail address required";
            return;
        }
        else if (!email.includes("@")) {
            emailWarning.textContent = "E-mail invalid";
            return;
        }
        else {
            emailWarning.textContent = "";
        }

        if (password.trim() === "") {
            passwordWarning.textContent = "Password required";
            return;
        }
        else {
            passwordWarning.textContent = "";
        }

        const response = await postLogin(email, password);

        if (response.status === 200) {
            localStorage.setItem("token", response.token); //Modify this to http-only cookie storage when app is live on Azure
            navigate("/ProfileLoader");
        }
        else {
            const loginWarning = document.getElementById("login-error");
            loginWarning.textContent = `ERROR: ${response.status}: ${response.message}`;
        }

    }

    return (
        <div className="page-home">
            <div className="home-card">
                <div className="home-hero">
                    <p className="hero-title">OwlMigo</p>
                    <p className="hero-header">
                        Connection Worth Waiting For
                    </p>

                    <p className="hero-content">
                        Escape the noise of instant messaging. OwlMigo brings back the magic of the letter, connecting you with friends around the globe, one wing-beat at a time.
                    </p>
                    <button className="hero-button" onClick={(e) => {navigate("/Register")}}>Start Now</button>
                </div>
                <div className="home-login">
                    <p className="login-title">Log in</p>
                    <p className="login-flavor">Already have an account?<br/> Your owls have been waiting for you!</p>
                    <div className="login-content">
                        <form onSubmit={(e) => {HandleLogin(e)}}>
                            <p className="login-error" id="login-error"></p>
                            <label htmlFor="email" className="login-label">E-mail:</label>
                            <input className="login-input" type="text" id="email" placeholder="Enter e-mail address" value={email} onChange={(e) => {SetEmail(e.target.value)}}></input>
                            <p className="login-error" id="email-error"></p>

                            <label htmlFor="password" className="login-label">Password:</label>
                            <input className="login-input" type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => {SetPassword(e.target.value)}}></input>
                            <p className="login-error" id="password-error"></p>

                            <div className="login-btn-container">
                                <button className="login-button" action="submit">Submit</button>
                                Don't have an account? Create one now!
                            </div>
                        </form>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Home;