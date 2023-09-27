import React from "react";
import LoginPage from "./pages/login";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "./pages/register";

const Routers = () =>{
    <Router>
        <Routes>
            <Route
                path='/'
                element={
                    <LoginPage />
                }
            />
            <Route
                path='/Registro'
                element={
                    <Register />
                }
            />
        </Routes>
    </Router>

}

export default Routers;