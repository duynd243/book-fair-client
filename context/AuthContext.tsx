import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  Unsubscribe,
} from "firebase/auth";
import React, {
  createContext,
  ReactComponentElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";
import LoadingProgress from "../components/Commons/LoadingProgress";

const AuthContext = createContext({});
export const useAuth: any = () => useContext(AuthContext);

type Props = {
  children: JSX.Element;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [serverUser, setServerUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: any) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        console.log("Firebase User: ", firebaseUser);
        console.log("Server User: ", serverUser);

        if (serverUser?.email !== firebaseUser?.email) {
          console.log("Call backend for getting user data...");
          try {
            const serverUser = await handleServerAuthentication(firebaseUser);
            if (serverUser)
              setServerUser({ ...serverUser, accessToken: "test" });
            console.log("Server user: ", serverUser);
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
      }, 700);
      return () => clearTimeout(timer);
    });
    return () => unsubscribe();
  }, [auth, serverUser]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        console.log("Google Sign In: ", result);
        await Swal.fire({
          icon: "success",
          title: `Welcome ${result?.user?.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(async () => {
        await Swal.fire({
          icon: "success",
          title: "Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <AuthContext.Provider
      value={{ user, serverUser, handleGoogleSignIn, logOut }}
    >
      {authLoading ? <LoadingProgress /> : children}
    </AuthContext.Provider>
  );
};