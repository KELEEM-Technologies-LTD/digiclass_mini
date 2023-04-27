import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/HOC";
import LoadingOverLay from "./components/loader";
import ContextProvider from "./context/provider";
import Quiz from "./pages/quiz/quiz";
import Certificate from "./pages/quiz/ceritificate";

const SigninPage = React.lazy(() => import("./pages/signin"));
const EnterEmail = React.lazy(() => import("./pages/enter-email"));
const EnterPWd = React.lazy(() => import("./pages/enter-pwd"));
const HomePage = React.lazy(() => import("./pages/home"));
const CoursesPage = React.lazy(() => import("./pages/course/course"));
const MyCourse = React.lazy(() => import("./pages/my-courses"));
const MyAccount = React.lazy(() => import("./pages/profile/account"));
const MyBuyNow = React.lazy(() => import("./pages/buy-now"));
const MyVerifyTransactions = React.lazy(() => import("./pages/verify-payment"));
const MyPaidCourse = React.lazy(() => import("./pages/my-course/paid-course"));
function App() {
  return (
    <React.Suspense fallback={<LoadingOverLay />}>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/*" element={<>958204d5604f48d4876dd3e535dba5d1</>} />
            {/* <Route path="/:corp_id" element={<SigninPage />} /> */}
            <Route path="/sign-in/:corp_id" element={<SigninPage />} />
            <Route path="/redeem/:corp_id" element={<EnterEmail />} />
            <Route path="/reset-pwd/:token/:corp_id" element={<EnterPWd />} />

            <Route element={<PrivateRoute />}>
              <Route path="/home/:corp_id" element={<HomePage />} />
              <Route path="/my-courses/:corp_id" element={<MyCourse />} />
              <Route path="/account/:corp_id" element={<MyAccount />} />
              <Route
                path="/buy-now/:courseid/:corp_id"
                element={<MyBuyNow />}
              />
              <Route
                path="/course/:course_id/:corp_id"
                element={<CoursesPage />}
              />
              <Route
                path="/my-course/:course_id/:corp_id"
                element={<MyPaidCourse />}
              />
              <Route
                path="/check/:corp_id/verifytransaction"
                element={<MyVerifyTransactions />}
              />
              <Route
                path="/start-quiz/:corp_id/:course_id"
                element={<Quiz />}
              />
              <Route
                path="/certifications/:corp_id/:course_id"
                element={<Certificate />}
              />
            </Route>
          </Routes>
        </ContextProvider>
      </Router>
    </React.Suspense>
  );
}

export default App;
