import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../Repos/AccountRepo";

function Register() {

    const navigate = useNavigate();

    const [username, SetUsername] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");

    const handleRegistration = async (e) => {
        e.preventDefault();

        const usernameWarning = document.getElementById("username-error");
        const emailWarning = document.getElementById("email-error");
        const passwordWarning = document.getElementById("password-error");
        const confirmPassWarning = document.getElementById("confirm-password-error");

        //Used to test conditions of inputs to ensure requirements are met before sending data to API
        const hasCapital = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const hasSymbol = /[^a-zA-Z0-9\s]/;
        const isEmail = /^\S+@\S+\.[a-zA-Z]{2,6}$/i;

        //Conditions tested before posting to API
        let usernameVerified = false;
        let passwordVerified = false;
        let confirmPasswordVerified = false;
        let emailVerified = false;

        //Username Error Handling
        if (username.trim() === "") {
            usernameWarning.textContent = "Username required";
        }
        else {
            usernameWarning.textContent = "";
            usernameVerified = true;
        }

        //Password Error Handling
        if (password.trim() === "") {
            passwordWarning.textContent = "Password required";
        }
        else if (password.length < 8) {
            passwordWarning.textContent = "Password must contain 8 characters";
        }
        else if (!hasCapital.test(password)) {
            passwordWarning.textContent = "Password must contain 1 capital letter";
        }
        else if (!hasLowercase.test(password)) {
            passwordWarning.textContent = "Password must contian 1 lowercase letter";
        }
        else if (!hasSymbol.test(password)) {
            passwordWarning.textContent = "Password must contain 1 symbol";
        }
        else {
            passwordWarning.textContent = "";
            passwordVerified = true;
        }

        //Confirm Password Error Handling
        if (confirmPassword.trim() === "") {
            confirmPassWarning.textContent = "Confirm password field required";
        }
        else if (confirmPassword !== password) {
            confirmPassWarning.textContent = "Passwords must match";
        }
        else {
            confirmPassWarning.textContent = "";
            confirmPasswordVerified = true;
        }

        //Email error handling
        if (email.trim() === "") {
            emailWarning.textContent = "Email required";
        }
        else if (!isEmail.test(email)) {
            emailWarning.textContent = "Valid email required";
        }
        else {
            emailWarning.textContent = "";
            emailVerified = true;
        }


        //Get response from API and navigate to profile loading or display error
        if (usernameVerified && passwordVerified && confirmPasswordVerified && emailVerified) {
            const response = await postRegister(username, email, password);
            
            if (response.status === 200) {
                localStorage.setItem("token", response.token); //Modify this to http-only cookie storage when app is live on Azure
                navigate("/ProfileLoader");
            }
            else {
                const registrationWarning = document.getElementById("registration-error");
                registrationWarning.textContent = `Registration Error: ${response.status}: ${response.message}`;
            }
        }
        
    }

    return (
        <div className="page-register">
            <div className="register-card">
                <h1 className="register-header">
                    Create a new account
                </h1>
                <div className="register-form">
                    <span className="register-error" id="registration-error"></span>
                    <form onSubmit={(e) => {handleRegistration(e)}}>
                        <div className="register-container">
                            <div className="register-subcontainer">
                                <label className="register-label" htmlFor="username">Username:</label> 
                                <input type="text" id="username" className="register-input" placeholder="Username" value={username} onChange={(e) => {SetUsername(e.target.value)}}></input>
                                <span className="register-error" id="username-error"></span>
                            </div>
                            <div className="register-subcontainer">
                                <label className="register-label" htmlFor="email">E-mail:</label>
                                <input type="email" id="email" className="register-input" placeholder="your_email@domain.com" value={email}  onChange={(e) => {SetEmail(e.target.value)}}></input>
                                <span className="register-error" id="email-error"></span>
                            </div>
                        </div>

                        <div className="register-container">
                            <div className="register-subcontainer">
                                <label className="register-label" htmlFor="password">Password:</label>
                                <input type="password" id="password" className="register-input" placeholder="Password" value={password} onChange={(e) => {SetPassword(e.target.value)}}></input>
                                <span className="register-error" id="password-error"></span>
                            </div>

                            <div className="register-subcontainer">
                                <label className="register-label" htmlFor="confirm-password">Confirm Password:</label>
                                <input type="password" id="confirm-password" className="register-input" placeholder="Confirm password" value={confirmPassword} onChange={(e) => {SetConfirmPassword(e.target.value)}}></input>
                                <span className="register-error" id="confirm-password-error"></span>
                            </div>
                        </div>

                        <div className="reg-btn-container">
                            <div className="register-subcontainer">
                                <button className="register-btn" action="submit">Register</button>
                            </div>
                        </div>
                    </form>

                    <div className="register-privacy">
                        We value your privacy. OwlMigo will never sell your data.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;