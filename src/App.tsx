import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "./assets/fonts/stylesheet.css"

import AppRoutes from "./routes";

function App() {
	return (
		<Router>
			<AppRoutes />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</Router>
	);
}

export default App;
