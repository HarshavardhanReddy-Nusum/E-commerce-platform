import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/verify`,
                    {
                        withCredentials: true,
                    }
                );

                setIsAuth(true);
            } catch (error) {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;