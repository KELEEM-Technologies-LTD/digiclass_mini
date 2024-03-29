import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import LoadingOverLay from "../components/loader";
import GeneralContext from "../context/gen";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { Link, useParams } from "react-router-dom";
import { StorageBox } from "../core/storage";
import GoogleButton from "../components/elements/google_button";
import {
  displayLoading,
  displaySuccess,
  displayWarning,
} from "../components/alert";
import jwtDecode from "jwt-decode";

const Signin = () => {
  const { loading, theme, corpid, setCorpId } = useContext(GeneralContext);
  document.title = `${theme?.name} - DigiClass`;

  const [currentUrl, setCurrentUrl] = useState<string | null>("");
  const [auth, setAuth] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { corp_id } = useParams();
  useEffect(() => {
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  const signin = async (e: any) => {
    e.preventDefault();
    setAuth(true);
    try {
      const res: any = await baseService.post(urls.signin, {
        username: email,
        password: password,
      });
      // console.log(res.data?.data);
      const response: any = res.data?.data;

      if (
        response?.user?.is_corporate &&
        response?.user?.corporate_id === corpid
      ) {
        const token = response.token;
        StorageBox.saveAccessToken(token);

        const res: any = await baseService.get(
          urls.get_corporate + `/${corpid}?`
        );
        const corp = res.data?.data;
        const user = response.user;

        if (!corp.verify_auth) {
          // const token = response.token;
          StorageBox.saveUserData(user);
          // StorageBox.saveAccessToken(token);
          window.location.href = `/main/${corpid}`;
        } else if (user.user_state === "pending") {
          setErr(
            "This organization has not approved your account to view content on their page."
          );
        } else {
          const user = response.user;
          StorageBox.saveUserData(user);
          // StorageBox.saveAccessToken(token);
          window.location.href = `/main/${corpid}`;
        }
      } else {
        setErr(
          "This organization has not authorized you to view content on their page."
        );
      }
      setAuth(false);
    } catch (error: any) {
      // setErr("There was an error");
      // console.log(error?.response?.data?.message);
      setErr(error?.response?.data?.message ?? "There was an error");
      setAuth(false);
    }
    // const;
  };

  const handleHandleCallbackResponse = async (response: any) => {
    // console.log(response);
    // console.log(response.credential);

    var user: any = jwtDecode(response.credential);

    // console.log(user);
    try {
      displayLoading("authenticating....");
      const res: any = await baseService.post(urls.signin, {
        username: user.email,
        password:
          "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
      });

      if (res.status === 200) {
        const userdata = res.data?.data?.user;
        const token = res.data?.data?.token;
        // const expirationDate = new Date().getTime() + 10 * 60 * 60 * 1000;

        StorageBox.saveUserData(userdata);
        StorageBox.saveAccessToken(token);
        displaySuccess("Logged in successfully", () => {
          const urlParams = new URLSearchParams(window.location.search);
          const newcur = urlParams.get("currentUrl");
          if (newcur !== null) {
            window.location.href = `/reload?currentUrl=${newcur}`;
          } else {
            window.location.href = "/reload";
          }
        });
      } else {
        displayWarning(
          "There was an error, please reload the page and try again"
        );
      }
    } catch (err: any) {
      displayWarning(err.response?.data?.message);
    }
  };

  useEffect(() => {
    /* global google */

    // google.accounts.id.initialize({
    //   client_id:
    //     "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
    //   callback: handleHandleCallbackResponse,
    // });

    // google.accounts.id.renderButton(
    //   document.getElementById("google_sign_icon"),
    //   { theme: "outline", size: "large" }
    // );

    const urlParams = new URLSearchParams(window.location.search);
    const currentUrl = urlParams.get("currentUrl");
    setCurrentUrl(currentUrl);
    checklogin();
  }, []);

  const checklogin = async () => {
    const token = await StorageBox.getAccessToken();
    const user = await StorageBox.retrieveUserData();

    if (token !== null && user !== null) {
      window.location.href = `/main/${corpid ? corpid : user.corporate_id}`;
    } else {
      await StorageBox.clearStorage();
    }
  };

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <div className="bg-gray-100" style={{ minHeight: "100vh" }}>
        <div
          style={{}}
          className="flex flex-col justify-center  md:items-center pt-8"
        >
          <div className=" md:w-3/12 md:p-0 px-6">
            <div className="flex flex-col">
              <div className="flex justify-center items-center mb-3">
                <Image
                  fluid
                  src={theme?.img ?? `/logo.png`}
                  alt="Logo"
                  style={{ height: "100px" }}
                />
              </div>
            </div>
            <p className="text-2xl mb-3 font-semibold text-dark text-center">
              Log into your account
            </p>
            <div style={{ height: "1.4px" }} className={`my-4 bg-slate-300`} />
            {/* <div id="google_sign_icon"></div> */}
            <small className="text-danger">{err}</small>
            <form action="" onSubmit={signin}>
              <div className="mt-3">
                <input
                  type="text"
                  className="py-3 px-4 w-full border border-black rounded bg-gray-50 outline-none"
                  placeholder="Enter your user id"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  className="py-3 px-4 w-full border border-black rounded bg-gray-50 outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Link
                  to={`/redeem/${corpid}`}
                  className="text-decoration-none text-base mt-3"
                >
                  Redeem account
                </Link>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme?.primary_color,
                  }}
                  disabled={auth}
                  className="whitespace-nonwrap border py-2 px-12 text-base font-medium text-white hover:bg-secondary-800"
                >
                  {auth ? <Spinner /> : "Sign In"}
                </button>
              </div>
            </form>
            <div className="flex items-center mt-4 justify-center">
              <p>New to Digiclass?</p>
              <Link to={`/sign-up/${corpid}`}>
                <p className="ml-2 text-base text-gray-700">Sign Up</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
