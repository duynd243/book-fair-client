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
import { ICartItem } from '../types/cart/ICartItem';
import { Roles } from '../constants/Roles';
import cart from '../pages/cart';

export interface IAuthContext {
    cart: ICartItem[];
    user: any;
    loginUser: ILoginUser;
    authLoading: boolean;
    handleGoogleSignIn: () => void;
    logOut: () => void;
    checkValidCartAction: () => boolean;
    handleEmailPasswordSignIn: (email: string, password: string) => void;
    handleEmailPasswordSignUp: (
        email: string,
        password: string,
        fullName: string
    ) => void;
    handleAddToCart: (item: ICartItem) => void;
    handleRemoveFromCart: (campaignBookId: number) => void;
    handleClearCart: () => void;
    handleClearCartByCampaignId: (campaignId: number) => void;
    handleUpdateCart: (id: number, quantity: number) => void;
}

const AuthContext = createContext({} as IAuthContext);
export const useAuth: () => IAuthContext = () => useContext(AuthContext);

type Props = {
    children: ReactNode;
};

const CART_KEY = 'cart';

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loginUser, setLoginUser] = useState<ILoginUser>(null!);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<ICartItem[]>([]);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const router = useRouter();

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        if (cartData) {
            setCart(cartData);
        }
    }, []);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                console.log('Google Sign In: ', result);
                toast.success('????ng nh???p th??nh c??ng');
                handleClearCart();
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
                toast.success('????ng nh???p th??nh c??ng');
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
            title: 'B???n c?? ch???c ch???n?',
            text: 'T??i kho???n c???a b???n s??? b??? ????ng xu???t!',
            icon: 'warning',
            confirmButtonText: '????ng xu???t',
            showCancelButton: true,
            cancelButtonText: 'H???y',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await signOut(auth);
                toast.success('????ng xu???t th??nh c??ng');
                await router.push('/').then(() => handleClearCart());
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

    const checkValidCartAction = (): boolean => {
        if (!loginUser) {
            toast.error('B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y');
            return false;
        }
        if (loginUser.role !== Roles.CUSTOMER.id) {
            toast.error('B???n kh??ng c?? quy???n th???c hi???n ch???c n??ng n??y');
            return false;
        }
        return true;
    };

    const saveCart = (cart: ICartItem[]) => {
        setCart(cart);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    };

    const handleAddToCart = (item: ICartItem): void => {
        const newCarts = [...cart];
        const index = cart.findIndex(
            (cartItem) => cartItem.campaignBookId === item.campaignBookId
        );

        if (index === -1) {
            newCarts.push(item);
        } else {
            newCarts[index].quantity += item.quantity;
        }
        saveCart(newCarts);
    };

    const handleRemoveFromCart = (campaignBookId: number) => {
        const newCart = [...cart];
        const index = newCart.findIndex(
            (i: ICartItem) => i.campaignBookId === campaignBookId
        );
        if (index !== -1) {
            newCart.splice(index, 1);
        }
        saveCart(newCart);
    };

    const handleUpdateCart = (id: number, quantity: number) => {
        const newCart = [...cart];
        const index = newCart.findIndex(
            (i: ICartItem) => i.campaignBookId === id
        );
        if (index !== -1) {
            newCart[index].quantity = quantity;
        }
        saveCart(newCart);
    };

    const handleClearCart = () => {
        saveCart([]);
    };

    const handleClearCartByCampaignId = (campaignId: number) => {
        const newCart = [...cart];
        const filteredItems = newCart.filter(
            (item) => item.campaignId !== campaignId
        );
        saveCart(filteredItems);
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
            }
        );
        return () => unsubscribe();
    }, [auth, loginUser]);

    return (
        <AuthContext.Provider
            value={{
                cart,
                user,
                loginUser,
                authLoading,
                handleGoogleSignIn,
                logOut,
                handleEmailPasswordSignIn,
                handleEmailPasswordSignUp,
                handleAddToCart,
                handleRemoveFromCart,
                handleUpdateCart,
                handleClearCart,
                handleClearCartByCampaignId,
                checkValidCartAction,
            }}
        >
            {authLoading ? <LoadingProgress /> : children}
        </AuthContext.Provider>
    );
};
