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
import { displaySuccess, displayWarning } from "../components/alert";

export default function Signup() {
  const { loading, theme, corpid } = useContext(GeneralContext);
  document.title = `${theme?.name} - DigiClass`;
  //   const { corp_id } = useParams();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [errmsg, setErrMsg] = useState("");

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    setErrMsg("");
  };

  const signup = async () => {
    if (isChecked === false) {
      displayWarning("Please accept the terms and conditions");
      return;
    }
    if (!password) {
      displayWarning("Please enter password!");
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
      await baseService.post(urls.signup + `/${corpid}`, payload);

      displaySuccess("Sign up successfully");
      setAuth(false);
      window.location.href = `/sign-in/${corpid}`;
    } catch (error) {
      setAuth(false);
      console.log(error);
    }
  };

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col md={6} sm={12}>
              <div className="bg-white p-4 text-center">
                <div className="flex justify-center items-center mb-3">
                  <Image
                    fluid
                    src={theme?.img}
                    alt="Logo"
                    style={{ height: "70px" }}
                  />
                </div>
                <h3 className="text-3xl" style={{ fontFamily: "sans-serif" }}>
                  {theme?.name}
                </h3>
                <h5 className="mt-2 text-base">Sign up</h5>
                <small className="text-danger">{err}</small>

                <div className="md:col-span-8 col-span-12 grid md:grid-cols-2 grid-cols-1 gap-12 my-8">
                  <div className="">
                    <p className="text-start mb-0">First Name</p>
                    <input
                      placeholder="First name"
                      type="text"
                      name="fname"
                      value={fname}
                      onChange={(e: any) => setFname(e.target.value)}
                      className="py-2 border-primary-600 px-3 outline-none border rounded w-full  flex  bg-primary-100  justify-between"
                    />
                    {/* <small className="text-danger">error</small> */}
                  </div>
                  <div>
                    <p className="text-start mb-0">Last Name</p>
                    <input
                      placeholder="Last name"
                      type="text"
                      name="lastName"
                      value={lname}
                      onChange={(e: any) => setLname(e.target.value)}
                      className="py-2 border-primary-600 px-3 outline-none border rounded w-full  flex  bg-primary-100  justify-between"
                    />
                    {/* <small className="text-danger">error</small> */}
                  </div>
                  <div>
                    <p className="text-start mb-0">Email</p>
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      className="py-2 border-primary-600 px-3 outline-none border rounded w-full  flex  bg-primary-100  justify-between"
                    />
                    {/* <small className="text-danger">error</small> */}
                  </div>
                  <div>
                    <p className="text-start mb-0">Password</p>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                      className="py-2 border-primary-600 px-3 outline-none border rounded w-full  flex  bg-primary-100  justify-between"
                    />
                    {/* <small className="text-danger">error</small> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col justify-start">
                    <p>
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
                        to="/privacy-policy"
                        className="text-secondary-600 text-base"
                      >
                        DigiClass Terms & Conditions
                      </Link>
                      .
                    </p>
                    {errmsg.length > 1 && (
                      <p className="text-red text-sm">{errmsg}</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={signup}
                      disabled={auth}
                      style={{ backgroundColor: theme?.primary_color }}
                      type="submit"
                      className={`bg-[${theme?.primary_color}] text-white px-9 py-2 mt-3`}
                    >
                      {auth ? <Spinner /> : "Sign Up"}
                    </button>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="flex lg:text-base text-sm">
                      <p className=" text-sm">
                        Have an account?{" "}
                        <Link
                          to={`/sign-in/${corpid}`}
                          className="text-decoration-none"
                        >
                          Signin here
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
