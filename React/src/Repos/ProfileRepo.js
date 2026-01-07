/*
    This function is used during the log-in process.
    It serves as a check, if successful, to tell the app the onboarding has been completed by the user.
    Profile data will be stored in a class that matches the ProfileDto in the API.
    Else, if this fails, the app redirects the user to complete the onboarding process and fill out their profile.
*/
export async function getProfile() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profiles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Profile could not be found";

            try {
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
            }
        }

        return {
            status: response.status,
            message: "Profile found"
        }
    }
    catch (error)
    {
        return {
            status: 500,
            message: "Error retrieving profile"
        }
    }
}

export async function getProfileByUsername(username) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profiles/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Profile could not be found";

            try {
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
            }
        }

        const data = await response.json();

        return {
            status: response.status,
            message: "Profile found",
            data: data
        }
    }
    catch (error)
    {
        return {
            status: 500,
            message: "Error retrieving profile"
        }
    }
}

export async function CreateProfile(firstName, lastName, dateOfBirth, country, gender, thumbnail, bio, hideRomance, hideName)
{
    const token = localStorage.getItem("token");
    const lastLogin = new Date().toISOString();

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profiles`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({firstName, lastName, dateOfBirth, country, gender, thumbnail, bio, hideRomance, hideName, lastLogin}),
        });

        if (!response.ok) {
            let errorMessage = "Failed to create profile";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message during profile creation")
            }

            return {
                status: response.status,
                message: errorMessage
            };
        }

        return {
            status: 200,
            message: "Profile creation successful"
        }
    }
    catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
    
}

export async function SearchProfiles(username, gender, minAge, maxAge, country, language, fluency, lookingFor, interest, onlyActive)
{
    const token = localStorage.getItem("token");
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profiles/search`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({username, gender, minAge, maxAge, country, language, fluency, lookingFor, interest, onlyActive}),
        });

         if (!response.ok) {
            let errorMessage = "Failed to retrieve any profiles";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message during profile creation")
            }

            return {
                status: response.status,
                message: errorMessage
            };
        }

        const data = await response.json();

        return {
            status: 200,
            message: "Search successfully handled",
            data: data
        }
    }
    catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}