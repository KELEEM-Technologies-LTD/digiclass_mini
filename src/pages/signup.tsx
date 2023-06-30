import { useContext, useEffect, useState } from "react";
import { Spinner, Image } from "react-bootstrap";
import LoadingOverLay from "../components/loader";
import GeneralContext from "../context/gen";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { Link, useNavigate } from "react-router-dom";
import { StorageBox } from "../core/storage";
import {
  displayLoading,
  displaySuccess,
  displayWarning,
} from "../components/alert";
import jwtDecode from "jwt-decode";
import PasswordInput from "../components/elements/PasswordInput";

export default function Signup() {
  const { loading, theme, corpid } = useContext(GeneralContext);
  document.title = `${theme?.name} - DigiClass`;
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [errmsg, setErrMsg] = useState("");

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    setErrMsg("");
  };

  const signup = async (e: any) => {
    e.preventDefault();
    if (!isChecked) {
      displayWarning("Please accept the terms and conditions");
      return;
    }
    if (!password) {
      displayWarning("Please enter a password!");
      return;
    }
    if (password !== cpassword) {
      displayWarning("Passwords dose not match!");
      return;
    }

    if (!fname) {
      displayWarning("Please enter first name!");
      return;
    }
    if (!lname) {
      displayWarning("Please enter last name!");
      return;
    }

    setAuth(true);
    try {
      const payload = {
        first_name: fname,
        last_name: lname,
        email,
        password,
      };
      const usr: any = await baseService.post(
        urls.signup + `/${corpid}`,
        payload
      );
      const user = usr.data?.data;
      console.log(user);
      StorageBox.saveUserData(user.user);
      StorageBox.saveAccessToken(user.token);

      const res: any = await baseService.get(
        urls.get_signup_questions + `/${corpid}`
      );
      const d = res.data?.data;

      if (d.length >= 1) {
        setAuth(false);
        const data = {
          questions: d,
          user: user.user,
        };
        displaySuccess("Sign up successfully");
        navigate(`/sign-up/questions/${corpid}`, { state: data });
      } else {
        setAuth(false);
        displaySuccess("Sign up successfully");
        navigate(`/sign-in/${corpid}`);
      }
    } catch (error) {
      setAuth(false);
      console.log(error);
    }
  };

  const handleHandleCallbackResponse = async (response: any) => {
    console.log(response);
    // console.log(response.credential);

    var user: any = jwtDecode(response.credential);

    console.log(user);

    displayLoading("authenticating....");

    try {
      const res: any = await baseService.post(urls.signup, {
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        password:
          "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
        user_role: "user",
      });
      console.log(res);
      if (res.status === 200) {
        const userdata = res.data?.data?.user;
        const token = res.data?.data?.token;

        StorageBox.saveUserData(userdata);
        StorageBox.saveAccessToken(token);

        const response: any = await baseService.get(
          urls.get_signup_questions + `/${corpid}`
        );
        const d = response.data?.data;

        if (d.length >= 1) {
          setAuth(false);
          const data = {
            questions: d,
            user: userdata,
          };
          displaySuccess("Account created successfully,Logged in successfully");
          navigate(`/sign-up/questions/${corpid}`, { state: data });
        } else {
          setAuth(false);
          displaySuccess("Account created successfully");
          navigate(`/main/${corpid}`);
        }
      } else {
        displayWarning(
          "There was an error, please reload the page and try again"
        );
      }
    } catch (error: any) {
      console.log(error);
      displayWarning(error.response?.data?.message);
    }
  };

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
      callback: handleHandleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google_sign_icon"),
      { theme: "outline", size: "large" }
    );

    // console.log(google);
    checklogin();
  }, []);

  const checklogin = async () => {
    const token = await StorageBox.getAccessToken();
    const user = await StorageBox.retrieveUserData();

    if (token !== null && user !== null) {
      window.location.href = `/main/${corpid}`;
    } else {
      await StorageBox.clearStorage();
    }
  };

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <div
          style={{}}
          className="flex flex-col justify-center  md:items-center py-8"
        >
          <div className=" md:w-3/12 md:p-0 px-6">
            <div className="flex flex-col">
              <div className="flex justify-center items-center mb-3">
                <Image
                  fluid
                  src={theme?.img}
                  alt="Logo"
                  style={{ height: "100px" }}
                />
              </div>
            </div>
            <p className="text-2xl mb-3 font-bold text-dark">
              Sign up and start learning
            </p>

            <div id="google_sign_icon"></div>
            <small className="text-danger">{err}</small>
            <form action="" onSubmit={signup}>
              <div className="mt-3">
                <input
                  type="text"
                  name="fname"
                  className="py-3 px-4 w-full placeholder:text-sm border border-black rounded bg-white outline-none"
                  placeholder="Enter your first name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  className="py-3 px-4 w-full placeholder:text-sm border border-black rounded bg-white outline-none"
                  placeholder="Enter your last name"
                  name="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  type="email"
                  className="py-3 px-4 w-full placeholder:text-sm border border-black rounded bg-white outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <PasswordInput
                  placeholder="Enter your password"
                  style={{ borderWidth: "2px" }}
                  className="flex py-3 placeholder:text-sm border-black border rounded bg-white justify-between"
                  name="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <PasswordInput
                  placeholder="Confirm Password"
                  style={{ borderWidth: "2px" }}
                  className="flex py-3 placeholder:text-sm border-black border rounded bg-white justify-between"
                  name="cpassword"
                  value={cpassword}
                  onChange={(e: any) => setCPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-center mt-3 justify-center">
                <div className="text-center text-sm">
                  <label className="cursor-pointer mr-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="p-0.5 cursor-pointer"
                    />
                  </label>
                  By clicking "Sign up", you agree to{" "}
                  <Link
                    to="http://kelemm-digiclass.herokuapp.com/privacy-policy"
                    className="text-gray-600"
                  >
                    DigiClass Terms & Conditions
                  </Link>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  style={{
                    backgroundColor: theme?.primary_color,
                  }}
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent px-4 py-2 text-base font-medium text-white"
                >
                  {auth ? <Spinner /> : <p className="text-white">Sign Up</p>}
                </button>
              </div>
              <div className="flex items-center mt-6 justify-center">
                <p>Already on Digiclass?</p>
                <Link to={`/sign-in/${corpid}`}>
                  <p className="ml-2 text-secondary-700">Login</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
