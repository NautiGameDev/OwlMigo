/* Array passed in is an array of IDs for each interest that matches the database IDs
    Array is then placed into the payload and sent in json body
    API uses arrays to create data in ProfileToInterest join table */
export async function PostInterests(idArray)
{
    const token = localStorage.getItem("token");
    const payload = {interestIds: idArray};

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ProfileToInterest`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let errorMessage = "Failed to create interest connections";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message)
                {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message during interest connection to user profile");
            }
        
            return {
                status: response.status,
                message: errorMessage
            }
        }

        return {
            status: 200,
            message: "Interests successfully linked to profile"
        }
    }
    catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }   
}


export async function GetInterestsByProfId(id)
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ProfileToInterest/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Interests could not be found for profile";

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
        const interests = rawData.map(item => item.interest.name);

        return {
            status: response.status,
            message: "Interests found",
            interests: interests
        }
    }
    catch (error)
    {
        return {
            status: 500,
            message: "Error retrieving interests for profile"
        }
    }
}