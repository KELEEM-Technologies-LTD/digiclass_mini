import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContextProvider from "./context/provider";
import LoadingOverLay from "./components/loader";
import PrivateRoute from "./components/HOC";

const SigninPage = React.lazy(() => import("./pages/signin"));
const EnterEmail = React.lazy(() => import("./pages/enter-email"));
const EnterPWd = React.lazy(() => import("./pages/enter-pwd"));
const HomePage = React.lazy(() => import("./pages/home"));
function App() {
  return (
    <React.Suspense fallback={<LoadingOverLay />}>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/redeem" element={<EnterEmail />} />
            <Route path="/reset-pwd/:token" element={<EnterPWd />} />

            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    </React.Suspense>
  );
}

export default App;
