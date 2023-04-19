import { useContext, useEffect } from "react";
import GeneralContext from "../context/gen";
import LoadingOverLay from "../components/loader";
import NavBar from "../components/navbar";
import { useParams } from "react-router-dom";
import { StorageBox } from "../core/storage";
import { Container } from "react-bootstrap";
import { LinearProgress } from "@mui/material";

export default function MyCourse() {
  const { loading, theme, corpid, setCorpId, myCourseLoading } =
    useContext(GeneralContext);

  const { corp_id } = useParams();
  useEffect(() => {
    if (StorageBox.retrieveUserData()?.corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <NavBar />
      {myCourseLoading ? (
        <LinearProgress
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme?.primary_color,
            },
          }}
        />
      ) : (
        <Container fluid></Container>
      )}
    </>
  );
}
