export async function postLogin(email, password) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/account/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        //Grab error message if login response fails
        if (!response.ok) {
            let errorMessage = "Invalid email or password"; //Default fallback message

            try {
                //Attempt to get the error message from ASP.NET
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message");
            }

            return {
                status: response.status, 
                message: errorMessage
            };
        }

        const data = await response.json();

        if (data.token) {
            return {
                token: data.token, 
                username: data.username, 
                email: data.email, 
                status: 200, 
                message: "Login successful"
            };
        }
        else {
            throw new Error("Login successful, but no token received from API.");
        }
    }
    catch (error) {
        return {status: 500, message: error.message};
    }
}

export async function postRegister(username, email, password) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/account/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });

        //Grab error message if registration response fails
        if (!response.ok) {
            let errorMessage = "Failed to create a new account"; //Default fallback message

            try {
                //Attempt to get the error message from ASP.NET
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message");
            }

            return {
                status: response.status, 
                message: errorMessage
            };
        }

        const data = await response.json();

        if (data.token) {
            return {
                token: data.token, 
                username: data.username, 
                email: data.email, 
                status: 200, 
                message: "Registration Successful"
            };
        }
        else {
            throw new Error("Registration successful, but no token received from API.");
        }
    }
    catch (error) {
        return {status: 500, message: error.message};
    }
}

/* 
    Method used to retrieve username and thumbnail of user logged in
   Used for quick retrieval of limited assets without the need to load in full profile
 */
export async function getMe()
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/account/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "UserNotFound";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError)
            {
                console.log("No JSON body in error message");
            }

            return {
                status: response.status,
                message: errorMessage,
                username: "guest",
                thumbnail: "OwlMigo_Beret.jpg"
            }
        }

        const data = await response.json();

        return {status: 200, message: "Ok", username: data.username, thumbnail: data.thumbnail};
    }
    catch (error)
    {
        return {
                status: 500,
                message: error.message,
                username: "guest",
                thumbnail: "OwlMigo_Beret.jpg"
            };
    }
}