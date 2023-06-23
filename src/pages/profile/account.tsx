import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import NavBar from "../../components/navbar";
import GeneralContext from "../../context/gen";
import { StorageBox } from "../../core/storage";
import { Tabs, styled, Tab } from "@mui/material";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";
import AccountSettings from "./sections/account_settings";
import Notifications from "./sections/notifications";
import Transactions from "./sections/transactions";
import { Container } from "react-bootstrap";

export default function Account() {
  const { loading, corpid, setCorpId, theme } = useContext(GeneralContext);

  const { corp_id } = useParams();

  const searchParams = new URLSearchParams(window.location.search);
  const tabindex = searchParams.get("tab");
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    if (tabindex) {
      const set: number = !Number.isNaN(parseInt(tabindex))
        ? parseInt(tabindex) > 2
          ? 2
          : parseInt(tabindex)
        : 0;
      setTab(set);
    }
    if (StorageBox.retrieveUserData()?.corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  const MyTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
      backgroundColor: theme?.primary_color,
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<any>([]);

  const getData = async () => {
    setDataLoading(true);
    try {
      const user: any = StorageBox.retrieveUserData();

      const trans: any = await baseService.get(
        urls.transactions + `/${user.user_id}`
      );
      setTransactions(trans.data?.payload);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <NavBar />
      <Container fluid>
        <Tabs
          value={tab}
          onChange={(e: any, newValue: any) => setTab(newValue)}
        >
          <Tab label="Account" />
          <Tab label="Notification" />
          <Tab label="Transactions" />
        </Tabs>
      </Container>
      <div style={{ minHeight: "50vh" }} className="px-5">
        {tab === 0 ? <AccountSettings /> : null}
        {tab === 1 ? <Notifications /> : null}
        {tab === 2 ? (
          <Transactions
            loading={dataLoading}
            transactions={transactions}
            theme={theme}
          />
        ) : null}
      </div>
    </>
  );
}
