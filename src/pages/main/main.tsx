import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GeneralContext from "../../context/gen";
import LoadingOverLay from "../../components/loader";
import NavBar from "../../components/navbar";
import HomeBanner from "./components/HomeBanner";
import ContinueLearning from "./components/ContinueLearning";
import { StorageBox } from "../../core/storage";

export default function Main() {
  const { corp_id } = useParams();
  const { loading, setCorpId, corpid } = useContext(GeneralContext);

  useEffect(() => {
    if (StorageBox.retrieveUserData()?.corporate_id !== corp_id) {
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
    <div>
      <NavBar />
      <HomeBanner />
      <ContinueLearning />
    </div>
  );
}
