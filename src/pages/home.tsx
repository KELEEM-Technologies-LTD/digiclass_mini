import { Container, Image, Navbar } from "react-bootstrap";
import GeneralContext from "../context/gen";
import { useContext } from "react";
import LoadingOverLay from "../components/loader";
import LogoutIcon from "@mui/icons-material/Logout";
import { StorageBox } from "../core/storage";

export default function Home() {
  const { loading, theme, user } = useContext(GeneralContext);

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={theme?.img}
              alt="company name"
              className="d-inline-block align-top me-2"
              style={{ width: "200px", height: "50px", objectFit: "cover" }}
              fluid
            />
          </Navbar.Brand>
          <div>
            <span
              style={{
                color: theme?.primary_color,
                fontWeight: "bolder",
                marginRight: "10px",
              }}
            >
              {theme?.name}
            </span>
            <LogoutIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                StorageBox.clearStorage();
                window.location.href = "/";
              }}
            />
          </div>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h5 className="text-center">
          Welcome {user?.first_name}, you can start learning your favorite
          courses now on digiclass.
        </h5>
      </Container>
    </>
  );
}
