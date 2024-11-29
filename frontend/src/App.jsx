
import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Header />
				<Main />
				<Footer />
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;

