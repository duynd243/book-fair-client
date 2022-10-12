// just for testing
import {useAuth} from "../../context/AuthContext";

const ProtectedPage = () => {
    const {logOut} = useAuth();
    return (
        <div>
            <h1>Protected Page</h1>
            <p>Only logged in users can see this page</p>

            <button
                onClick={logOut}
                className='tw-btn tw-btn-primary'>Logout</button>
        </div>

    )
}

export default ProtectedPage;