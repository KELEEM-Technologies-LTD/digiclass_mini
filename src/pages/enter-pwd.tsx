import { useState, useContext, useEffect } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import GeneralContext from "../context/gen";
import LoadingOverLay from "../components/loader";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { corp_url } from "../core/corporate.info";
import { useParams } from "react-router-dom";
import { displaySuccess, displayWarning } from "../components/alert";

export default function EnterPwd() {
  const { loading, theme } = useContext(GeneralContext);
  const { token } = useParams();
  const [pwd, setPwd] = useState<string>("");
  const [c_pwd, setCPwd] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  const change_pwd = async (e: any) => {
    e.preventDefault();
    setAuth(true);
    try {
      await baseService.post(urls.resetPwd + `/${token}`, {
        password: pwd,
        password_confirm: c_pwd,
      });
      setAuth(false);
      displaySuccess("Password updated successfully, please login", () => {
        window.location.href = "/";
      });
    } catch (error: any) {
      console.log();
      setAuth(false);
      const message = error?.response?.data;
      //   console.log(message);
      displayWarning(
        message.err?.details
          ? message.err?.details[0].message
          : message.err?.message
      );
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      await baseService.get(urls.verify + "/" + token);
    } catch (error: any) {
      displayWarning(error?.response?.data?.message, 1000, () => {
        window.location.href = "/";
      });
    }
  };

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <Container className="py-4">
          <Row className="justify-content-center mt-5">
            <Col md={6} sm={12}>
              <small>Please create a new account </small>
              {/* {token} */}
              <Form className="mt-4" onSubmit={change_pwd}>
                <FloatingLabel
                  controlId="fpwd"
                  className="mb-3"
                  label="Password"
                >
                  <Form.Control
                    type="password"
                    placeholder="example@gmail.com"
                    required={true}
                    value={pwd}
                    onChange={(e: any) => setPwd(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="dcpwd"
                  className="mb-3"
                  label="Comfirm Password"
                >
                  <Form.Control
                    type="password"
                    placeholder="example@gmail.com"
                    required={true}
                    value={c_pwd}
                    onChange={(e: any) => setCPwd(e.target.value)}
                  />
                </FloatingLabel>
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
                    {auth ? <Spinner /> : "Change password"}
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
