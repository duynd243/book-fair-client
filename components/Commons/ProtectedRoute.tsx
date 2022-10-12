import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const x = async () => {
      if (!user) {
        await router.push("/login");
        await Swal.fire({
          icon: "error",
          title: "Opps...",
          text: "You are not authorized",
        });
      }
    };
    x().then((r) => r);
  }, [user, router]);
  return <>{user && children}</>;
};

export default ProtectedRoute;