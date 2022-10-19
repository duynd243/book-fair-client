import {
    createUserWithEmailAndPassword,
    getAuth,
    getIdToken,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    Unsubscribe,
    updateProfile,
} from 'firebase/auth';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import Swal from 'sweetalert2';
import LoadingProgress from '../components/Commons/LoadingProgress';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AuthContext = createContext({});
export const useAuth: any = () => useContext(AuthContext);

type Props = {
    children: ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [serverUser, setServerUser] = useState<any>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const router = useRouter();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                console.log('Google Sign In: ', result);
                toast.success('Đăng nhập thành công');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEmailPasswordSignUp = (
        email: string,
        password: string,
        fullName: string
    ) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                console.log('Email Password Sign Up: ', result);
                if (result?.user) {
                    await updateProfile(result.user, {
                        displayName: fullName,
                    });
                }
                await Swal.fire({
                    icon: 'success',
                    title: `Created ${result?.user?.displayName}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                await router.push('/login');
            })
            .catch(async (err) => {
                console.log(err);
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            });
    };

    const handleEmailPasswordSignIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                console.log('Email Password Sign In: ', result);
                toast.success('Đăng nhập thành công');
            })
            .catch(async (err) => {
                console.log(Object.keys(err).map((key) => err[key]));
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            });
    };

    const logOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await signOut(auth);
                toast.success('Đăng xuất thành công');
                await router.push('/');
            }
        });
    };

    const handleServerAuthentication = (firebaseUser: any) => {
        return new Promise((resolve, reject) => {
            // fetch(`${process.env.baseUrl}/api/auth`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: user.email,
            //         name: user.displayName,
            //         photo: user.photoURL
            //     })
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         setServerUser(data);
            //         resolve(data);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         reject(err);
            //     })

            resolve({ email: firebaseUser?.email });
        });
    };

    useEffect(() => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser: any) => {
                if (firebaseUser) {
                    setUser(firebaseUser);
                    console.table(firebaseUser);
                    console.log('Server User: ', serverUser);

                    if (serverUser?.email !== firebaseUser?.email) {
                        console.log('Call backend for getting user data...');
                        try {
                            const serverUser = await handleServerAuthentication(
                                firebaseUser
                            );
                            if (serverUser)
                                setServerUser({
                                    ...serverUser,
                                    accessToken: 'test',
                                });
                            console.log('Server user: ', serverUser);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } else {
                    setUser(null);
                    setServerUser(null);
                }
                const timer = setTimeout(() => {
                    setAuthLoading(false);
                }, 500);
                return () => clearTimeout(timer);
            }
        );
        return () => unsubscribe();
    }, [auth, serverUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                serverUser,
                handleGoogleSignIn,
                logOut,
                handleEmailPasswordSignIn,
                handleEmailPasswordSignUp,
            }}
        >
            {authLoading ? <LoadingProgress /> : children}
        </AuthContext.Provider>
    );
};
