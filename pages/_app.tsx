import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../styles/globals.css';
import { initFirebaseApp } from '../firebase/initFirebase';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { PROTECTED_ROUTES } from '../constants/ProtectedRoutes';
import ProtectedRoute from '../components/Commons/ProtectedRoute';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initFirebaseApp();
export const queryClient: QueryClient = new QueryClient();

function BookFairApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isProtectedPage = PROTECTED_ROUTES.some((route) =>
        router.pathname.includes(route.path)
    );
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <AuthContextProvider>
                {isProtectedPage ? (
                    <ProtectedRoute>
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
