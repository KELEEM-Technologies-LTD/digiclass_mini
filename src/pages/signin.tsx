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

const Signin = () => {
  const { loading, theme, corpid, setCorpId } = useContext(GeneralContext);
  document.title = `${theme?.name} - DigiClass`;

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
        const user = response.user;
        StorageBox.saveUserData(user);
        StorageBox.saveAccessToken(token);

        window.location.href = `/home/${corpid}`;
      } else {
        setErr(
          "This organization has not authorized you to view content on their page."
        );
      }
      setAuth(false);
    } catch (error: any) {
      // setErr("There was an error");
      console.log(error?.response?.data?.message);
      setErr(error?.response?.data?.message ?? "There was an error");
      setAuth(false);
    }
    // const;
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
                    style={{ height: "100px" }}
                  />
                </div>
                <h3 className="text-3xl" style={{ fontFamily: "sans-serif" }}>
                  {theme?.name}
                </h3>
                <h5 className="mt-2 text-base">Sign in</h5>

                <small className="text-danger">{err}</small>
                <Form className="mt-4" onSubmit={signin}>
                  <FloatingLabel
                    controlId="floatingEmail"
                    className="mb-3"
                    label="username"
                  >
                    <Form.Control
                      type="text"
                      placeholder="example@gmail.com"
                      required={true}
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPassword"
                    className="mb-3"
                    label="Password"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required={true}
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                    />
                  </FloatingLabel>

                  <div className=" flex justify-between">
                    <div className="flex lg:text-base text-sm">
                      <p>
                        Do have an account?{" "}
                        <Link
                          to={`/sign-up/${corpid}`}
                          className="text-decoration-none"
                        >
                          Signup here
                        </Link>
                      </p>
                    </div>
                    <Link
                      to={`/redeem/${corpid}`}
                      className="text-decoration-none"
                    >
                      Redeem account
                    </Link>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      style={{
                        margin: "auto",
                        padding: "14px 16px",
                        color: "white",
                        opacity: 1,
                        backgroundColor: theme?.primary_color,
                        border: "none",
                      }}
                      disabled={auth}
                    >
                      {auth ? <Spinner /> : "Sign In"}
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Signin;
