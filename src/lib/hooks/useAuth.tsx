import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import storage from "../../utils/storage";
import { APP_ROUTES } from "../../utils/routes";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = storage.getToken();

        setIsAuthenticated(!!token);
    }, []);

    const loginUser = (token: string) => {
        storage.setToken(token);

        setIsAuthenticated(true);
    };

    const AuthRedirect = ({ to }: { to: string }) => {
        return <Navigate to={to} />;
    };

    const logout = () => {
        storage.clearToken();

        setIsAuthenticated(false);
    };

    const ProtectedRoute = ({ component: Component, ...rest }: any) => {
        if (!isAuthenticated && !storage.getToken()) {
            return <AuthRedirect to={APP_ROUTES.HOME} />;
        }

        return <Component {...rest} />;
    };

    return { isAuthenticated, loginUser, logout, ProtectedRoute };
};

export default useAuth;
