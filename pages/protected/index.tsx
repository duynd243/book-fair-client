// just for testing

import { useAuth } from 'context/AuthContext';
import Link from 'next/link';

const ProtectedPage = () => {
    const { loginUser } = useAuth();

    return (
        <div className="tw-flex tw-h-screen tw-w-screen tw-flex-col tw-items-center tw-justify-center">
            <button
                className="tw-btn-primary tw-btn tw-mb-4"
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
            <Link href={'/'} className="tw-btn">
                Go Home
            </Link>
        </div>
    );
};

export default ProtectedPage;
