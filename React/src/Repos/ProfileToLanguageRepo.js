
/* Language array passed in is an array of the following objects:
    { language: langName, level: fluency }

    The API uses this payload to create links of user profile to language spoken with stored fluency level
    */
export async function PostLanguages(languageArray) {
    const token = localStorage.getItem("token");
    const payload = {languages: languageArray};

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ProfileToLanguage`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)        
        });

        if (!response.ok) {
            let errorMessage = "Failed to create language connections";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message)
                {
                    errorMessage = errorData.message;
                }                
            }
            catch (jsonError)
            {
                console.log("No JSON body in error message during language connection to user profile");
            }

            return {
                status: response.status,
                message: errorMessage
            };
        }

        return {
            status: 200,
            message: "Languages successfully linked to profile"
        }
    }
    catch (error)
    {
        return {
            status: 500,
            message: error.message
        }
    }    
}

export async function GetLanguagesByProfId(id)
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ProfileToLanguage/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Languages could not be found for profile";

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

        const rawData = await response.json();
        const languages = rawData.map(item => ({language: item.language.name, level: item.level}));

        return {
            status: response.status,
            message: "Languages found",
            languages: languages
        }
    }
    catch (error)
    {
        return {
            status: 500,
            message: "Error retrieving languages for profile"
        }
    }
}