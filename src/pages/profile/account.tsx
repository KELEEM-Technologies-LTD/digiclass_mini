import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import NavBar from "../../components/navbar";
import GeneralContext from "../../context/gen";
import { StorageBox } from "../../core/storage";
import { Tabs, styled } from "@mui/material";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";
import AccountSettings from "./sections/account_settings";
import Notifications from "./sections/notifications";
import Transactions from "./sections/transactions";
import { Nav, Tab } from "react-bootstrap";

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
  const [userData, setUserData] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);

  const getData = async () => {
    setDataLoading(true);
    try {
      const user: any = StorageBox.retrieveUserData();
      setUserData(user);

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
      <Tab.Container defaultActiveKey="account">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventKey="account"
              style={{ fontSize: "14px", color: theme?.primary_color }}
            >
              Account
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="notification"
              style={{ fontSize: "14px", color: theme?.primary_color }}
            >
              Notification
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="transactions"
              style={{ fontSize: "14px", color: theme?.primary_color }}
            >
              Transactions
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="account">
            <AccountSettings
              user={userData}
              loading={dataLoading}
              theme={theme}
              getData={getData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="notification">
            <Notifications />
          </Tab.Pane>
          <Tab.Pane eventKey="transactions">
            {" "}
            <Transactions
              loading={dataLoading}
              transactions={transactions}
              theme={theme}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
}
