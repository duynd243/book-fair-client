import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";
import { initFirebaseApp } from "../firebase/initFirebase";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { PROTECTED_ROUTES } from "../constants/ProtectedRoutes";
import ProtectedRoute from "../components/Commons/ProtectedRoute";
import { AppProps } from "next/app";

initFirebaseApp();
const queryClient: QueryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProtectedPage = PROTECTED_ROUTES.some(
    (route) => route.path === router.pathname
  );
  return (
    <QueryClientProvider client={queryClient}>
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

export default MyApp;