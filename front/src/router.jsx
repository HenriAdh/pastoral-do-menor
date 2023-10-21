import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/login";
import Register from "./pages/register";
import Error404 from "./pages/notFoundPage";
import RecoveryPage from "./pages/recoveryPass";
import HomePage from "./pages/homePage";
import NewEntry from "./pages/subPages/new-entry";
import Report from "./pages/subPages/report";
import Stock from "./pages/subPages/reports/stock";
import Admin from "./pages/admin";

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <LoginPage />
                    }
                    errorElement={<Error404 />}
                />
                <Route
                    path='/hangarekamaori'
                    element={
                        <Admin/>
                    }
                    errorElement={<Error404 />}
                />
                <Route
                    path='/registrar'
                    element={
                        <Register />
                    }
                    errorElement={<Error404 />}
                />
                <Route
                    path="/restaurar-senha"
                    element={
                        <RecoveryPage />
                    }
                    errorElement={<Error404 />}
                />
                <Route 
                    path="/home"
                    element={<HomePage />}
                    errorElement={<Error404 />}
                >
                    <Route
                        path="nova-entrada"
                        element={<NewEntry />}
                    />
                    <Route
                        path="relatorio"
                        element={<Report />}
                    >
                        <Route
                            path="estoque" 
                            element={<Stock />}
                        />,
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default Routers;