import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/HOC";
import LoadingOverLay from "./components/loader";
import ContextProvider from "./context/provider";

const SigninPage = React.lazy(() => import("./pages/signin"));
const EnterEmail = React.lazy(() => import("./pages/enter-email"));
const EnterPWd = React.lazy(() => import("./pages/enter-pwd"));
const HomePage = React.lazy(() => import("./pages/home"));
const CoursesPage = React.lazy(() => import("./pages/course/course"));
function App() {
  return (
    <React.Suspense fallback={<LoadingOverLay />}>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/*" element={<>Page not found</>} />
            {/* <Route path="/:corp_id" element={<SigninPage />} /> */}
            <Route path="/sign-in/:corp_id" element={<SigninPage />} />
            <Route path="/redeem/:corp_id" element={<EnterEmail />} />
            <Route path="/reset-pwd/:token/:corp_id" element={<EnterPWd />} />

            <Route element={<PrivateRoute />}>
              <Route path="/home/:corp_id" element={<HomePage />} />
              <Route
                path="/course/:course_id/:corp_id"
                element={<CoursesPage />}
              />
            </Route>
          </Routes>
        </ContextProvider>
      </Router>
    </React.Suspense>
  );
}

export default App;
