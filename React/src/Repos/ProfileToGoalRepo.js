/* Array passed in is an array of IDs for each goal (friendship, romance, etc.) that matches the database IDs
    Array is then placed into the payload and sent in json body */
export async function PostGoals(idArray) {
    const token = localStorage.getItem("token");
    const payload = {goalIds: idArray};

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ProfileToGoal`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let errorMessage = "Failed to create goal connections";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message)
                {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message during language connection to user profile");
            }
        
            return {
                status: response.status,
                message: errorMessage
            }
        }

        return {
            status: 200,
            message: "Goals successfully linked to profile"
        }
    }
    catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

export async function GetGoalsByProfId(id)
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ProfileToGoal/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Goals could not be found for profile";

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
        const goals = rawData.map(item => item.goal.name);

        return {
            status: response.status,
            message: "Goals found",
            goals: goals
        }
    }
    catch (error)
    {
        return {
            status: 500,
            message: "Error retrieving goals for profile"
        }
    }
}