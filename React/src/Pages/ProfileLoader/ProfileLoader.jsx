import "./ProfileLoader.css";
import { useEffect } from "react";
import { getProfile } from "../../Repos/ProfileRepo";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

function ProfileLoader() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndRedirect = async () => {
            const result = await getProfile();
             
            if (result.status == 200)
            {
                await new Promise(resolve => setTimeout(resolve, 1000)); //Fake delay for loading spinner testing
                navigate("/Dashboard");
            }
            else if (result.status == 404) {
                await new Promise(resolve => setTimeout(resolve, 1000)); //Fake delay for loading spinner testing
                navigate("/Onboarding");
            }
            else {
                alert(`Error: ${result.status}: ${result.message}`);
                navigate("/");
            }
        }

        fetchAndRedirect();
    }, []);

    return (
        <div className="page-profile-loader">
            <LoadingSpinner/>
        </div>        
    )
}

export default ProfileLoader;

