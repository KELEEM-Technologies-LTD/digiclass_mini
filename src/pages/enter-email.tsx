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
import { displaySuccess } from "../components/alert";
import { useParams } from "react-router-dom";

export default function EnterEmail() {
  const { loading, theme, corpid, setCorpId } = useContext(GeneralContext);
  const [email, setEmail] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  const { corp_id } = useParams();
  useEffect(() => {
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  const send_eamil = async (e: any) => {
    e.preventDefault();
    setAuth(true);
    try {
      const res: any = await baseService.get(
        urls.resetemail + `/${email}/${corp_url}/${corpid}`
      );
      setAuth(false);
      //   console.log(res.data?.message);
      displaySuccess(`${res?.data?.message}`, () => {}, 7000);
    } catch (error) {
      console.log(error);
      setAuth(false);
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
              <div className="text-center">
                <small>
                  Please enter the email address available to your organization
                  to redeem your corporate account
                </small>
              </div>
              <Form className="mt-4" onSubmit={send_eamil}>
                <FloatingLabel
                  controlId="floatingEmail"
                  className="mb-3"
                  label="Email"
                >
                  <Form.Control
                    type="text"
                    placeholder="example@gmail.com"
                    required={true}
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
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
                    {auth ? <Spinner /> : "Redeem"}
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
