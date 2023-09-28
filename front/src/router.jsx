import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/login";
import Register from "./pages/register";
import Error404 from "./pages/notFoundPage";
import RecoveryPage from "./pages/recoveryPass";
import HomePage from "./pages/homePage";
import NewEntry from "./pages/subPages/new-entry";
import NewExit from "./pages/subPages/new-exit";
import Report from "./pages/subPages/report";
import Stock from "./pages/subPages/reports/stock";
import OpenRequests from "./pages/subPages/reports/openRequests";
import ClosedRequests from "./pages/subPages/reports/closedRequests";

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
                        path="nova-saida"
                        element={<NewExit />}
                    />
                    <Route
                        path="relatorio"
                        element={<Report />}
                    >
                        <Route
                            path="estoque" 
                            element={<Stock />}
                        />,
                        <Route
                            path="solicitacoes-abertas" 
                            element={<OpenRequests />}
                        />,
                        <Route
                            path="solicitacoes-fechadas" 
                            element={<ClosedRequests />}
                        />,
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default Routers;