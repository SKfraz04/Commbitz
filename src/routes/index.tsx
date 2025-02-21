import React from "react";
import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import useAuth from "../lib/hooks/useAuth";

const AppRoutes = () => {
	const { ProtectedRoute } = useAuth();

	const protectedRoutesList = protectedRoutes.map((item) => ({
		...item,
		element: <ProtectedRoute component={item.element} />,
	}));

	const routes = [...protectedRoutesList, ...publicRoutes];

	const elements = useRoutes(routes);

	return <>{elements}</>;
};

export default AppRoutes;
