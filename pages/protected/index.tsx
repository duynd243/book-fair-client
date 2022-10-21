// just for testing

import { useAuth } from 'context/AuthContext';
const ProtectedPage = () => {
    const { serverUser } = useAuth();

    return (
        <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center">
            <button
                className="tw-btn"
                onClick={() => {
                    if (serverUser && serverUser.accessToken) {
                        navigator.clipboard.writeText(serverUser.accessToken);
                        alert('Đã copy rồi nha chế ơi');
                    } else {
                        alert('No access token');
                    }
                }}
            >
                Copy Token
            </button>
        </div>
    );
};

export default ProtectedPage;
