
export async function CreateLetter(receiverName, senderName, subject, content)
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/letters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({receiverName, senderName, subject, content})
        });

        if (!response.ok)
        {
            let errorMessage = "Failed to create letter";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message during letter creation");
            }

            return {
                status: response.status,
                message: errorMessage
            };
        }

        

        return {
            status: 200,
            message: "Letter created successfully"
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

export async function GetInbound()
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/letters/inbound`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Failed to get inbound letters";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message while fetching inbound letters");
            }

            return {
                status: response.status,
                message: errorMessage
            };
        }

        const data = await response.json();

        return {
            status: 200,
            message: "Inbound letters successfully retrieved",
            data: data
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


export async function GetOutbound()
{
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/letters/outbound`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            let errorMessage = "Failed to get outbound letters";

            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            }
            catch (jsonError) {
                console.log("No JSON body in error message while fetching letters");
            }

            return {
                status: response.status,
                message: errorMessage
            };
        }

        const data = await response.json();

        return {
            status: 200,
            message: "Outbound letters successfully retrieved",
            data: data
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