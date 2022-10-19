import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/Commons/ProtectedRoute';
import { PROTECTED_ROUTES } from '../constants/ProtectedRoutes';
import { AuthContextProvider } from '../context/AuthContext';
import { initFirebaseApp } from '../firebase/initFirebase';
import '../styles/globals.css';

initFirebaseApp();
const queryClient: QueryClient = new QueryClient();

function BookFairApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isProtectedRoute = PROTECTED_ROUTES.find((route) =>
        router.pathname.includes(route.path)
    );

    console.log('isProtectedRoute: ', isProtectedRoute);
    console.log('router_pathname: ', router.pathname);

    useEffect(() => {
        if (router.query.unauthorized) {
            toast.error(
                'Tài khoản của bạn không có quyền truy cập vào trang này'
            );
            router.replace('/');
        }
    }, [router]);

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                className={'tw-opacity-90'}
                position={'bottom-right'}
                theme={'dark'}
            />
            <AuthContextProvider>
                {isProtectedRoute ? (
                    <ProtectedRoute
                        allowedRoles={isProtectedRoute.allowedRoles}
                    >
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
