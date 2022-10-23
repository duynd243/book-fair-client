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
import { ILoginUser } from 'types/user/ILoginUser';
import LoadingProgress from '../components/Commons/LoadingProgress';

export interface IAuthContext {
    user: any;
    loginUser: ILoginUser;
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
    const [loginUser, setLoginUser] = useState<ILoginUser>(null!);
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
            title: 'Bạn có chắc chắn?',
            text: 'Tài khoản của bạn sẽ bị đăng xuất!',
            icon: 'warning',
            confirmButtonText: 'Đăng xuất',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
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
                setLoginUser(data);
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
                    if (loginUser?.email !== firebaseUser?.email) {
                        await handleServerAuthentication(firebaseUser);
                    }
                } else {
                    setUser(null);
                    setLoginUser(null!);
                }
                setAuthLoading(false);
                // const timer = setTimeout(() => {
                //     setAuthLoading(false);
                // }, 500);
                // return () => clearTimeout(timer);
            }
        );
        return () => unsubscribe();
    }, [auth, loginUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUser,
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
