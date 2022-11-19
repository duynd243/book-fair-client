import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/Commons/ProtectedRoute';
import { PROTECTED_ROUTES } from '../constants/ProtectedRoutes';
import { AuthContextProvider } from '../context/AuthContext';
import { initFirebaseApp } from '../utils/firebase/initFirebase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.css';

initFirebaseApp();
const queryClient: QueryClient = new QueryClient();

function BookFairApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    console.log(router.pathname);
    const isProtectedRoute = PROTECTED_ROUTES.find((route) =>
        router.pathname.startsWith(route.path)
    );

    console.log(isProtectedRoute);
    // useEffect(() => {
    //     if (router.query.unauthorized) {
    //         toast.error(
    //             'Tài khoản của bạn không được cấp quyền truy cập vào trang này'
    //         );
    //
    //         const params = new URLSearchParams();
    //
    //         // remove query param
    //         router.replace({ pathname, query: params.toString() }, undefined, {
    //             shallow: true,
    //         });
    //     }
    // }, [router, pathname]);

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                className={'opacity-90'}
                position={'bottom-right'}
                theme={'dark'}
            />
            <AuthContextProvider>
                {isProtectedRoute ? (
                    <ProtectedRoute routeData={isProtectedRoute}>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                ) : (
                    <Component {...pageProps} />
                )}
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default BookFairApp;
