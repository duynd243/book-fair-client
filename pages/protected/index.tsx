import { useAuth } from 'context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const ProtectedPage = () => {
    const { loginUser, user } = useAuth();

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Image
                src={user.photoURL}
                alt={user.displayName}
                className={'mb-2'}
                width={50}
                height={50}
            />
            <p>{user.photoURL}</p>
            <button
                className="btn-primary btn mb-4"
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
            <button
                className="btn-primary btn mb-4"
                onClick={async () => {
                    if (user) {
                        const idToken = await user.getIdToken();
                        if (idToken) {
                            try {
                                await navigator.clipboard.writeText(idToken);
                                alert('Đã copy rồi nha chế ơi');
                            } catch (e) {
                                console.log(e);
                            }
                        } else {
                            alert('No id token');
                        }
                    }
                }}
            >
                Copy Firebase Id Token
            </button>
            <Link href={'/'} className="btn">
                Go Home
            </Link>
        </div>
    );
};

export default ProtectedPage;
