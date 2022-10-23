// just for testing

import { useAuth } from 'context/AuthContext';

const ProtectedPage = () => {
    const { loginUser } = useAuth();

    return (
        <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center">
            <button
                className="tw-btn"
                onClick={async () => {
                    if (loginUser && loginUser.accessToken) {
                        try {
                            await navigator.clipboard.writeText(
                                loginUser.accessToken
                            );
                            alert('Đã copy rồi nha chế ơi');
                        } catch (e) {
                            console.log(e);
                        }
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
