import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    Unsubscribe,
    updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { toast } from 'react-toastify';
import { UserService } from 'services/UserService';
import Swal from 'sweetalert2';
import { IServerUser } from 'types/user/IServerUser';
import LoadingProgress from '../components/Commons/LoadingProgress';

export interface IAuthContext {
    user: any;
    serverUser: IServerUser;
    authLoading: boolean;
    handleGoogleSignIn: () => void;
    logOut: () => void;
    handleEmailPasswordSignIn: (email: string, password: string) => void;
    handleEmailPasswordSignUp: (
        email: string,
        password: string,
        fullName: string
    ) => void;
}

const AuthContext = createContext({} as IAuthContext);
export const useAuth: () => IAuthContext = () => useContext(AuthContext);

type Props = {
    children: ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [serverUser, setServerUser] = useState<IServerUser>(null!);
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

    const handleServerAuthentication = async (firebaseUser: any) => {
        try {
            const { data } = await new UserService().loginWithFirebaseIdToken(
                firebaseUser?.accessToken
            );
            if (data) {
                setServerUser(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser: any) => {
                if (firebaseUser) {
                    setUser(firebaseUser);
                    if (serverUser?.email !== firebaseUser?.email) {
                        await handleServerAuthentication(firebaseUser);
                    }
                } else {
                    setUser(null);
                    setServerUser(null!);
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
                authLoading,
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
