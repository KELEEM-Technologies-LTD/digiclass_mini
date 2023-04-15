import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import GeneralContext from "../context/gen";
import { StorageBox } from "../core/storage";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { theme, corpid } = useContext(GeneralContext);
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand
            onClick={() => navigate(`/home/${corpid}`)}
            style={{ cursor: "pointer" }}
          >
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
                window.location.href = `/sign-in/${corpid}`;
              }}
            />
          </div>
        </Container>
      </Navbar>
    </>
  );
}
