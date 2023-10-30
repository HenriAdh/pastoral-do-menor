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
import ViewItens from "./pages/subPages/view-item";
import NewRequest from "./pages/subPages/new-Request";
import ViewRequest from "./pages/subPages/view-requests";
import RequestReport from "./pages/subPages/reports/request";

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
                        path="novo-item"
                        element={<NewEntry />}
                    />

                    <Route
                        path="itens"
                        element={<ViewItens />}
                    />

                    <Route
                        path="novo-pedido"
                        element={<NewRequest />}
                    />

                    <Route
                        path="pedidos"
                        element={<ViewRequest />}
                    />

                    <Route
                        path="relatorios"
                        element={<Report />}
                    >
                        <Route
                            path="estoque" 
                            element={<Stock />}
                        />
                        <Route
                            path="pedidos" 
                            element={<RequestReport />}
                        />
                    </Route>
                </Route>
                <Route 
                    path="*"
                    element={
                        <LoginPage />
                    }
                />
            </Routes>
        </Router>
    )
}

export default Routers;