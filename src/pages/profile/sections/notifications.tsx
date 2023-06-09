import { LinearProgress } from "@mui/material";
import moment from "moment";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GeneralContext from "../../../context/gen";
import { Cancel } from "@mui/icons-material";
import { useFetcher } from "react-router-dom";

export default function Notifications() {
  const { read, unread, theme } = useContext(GeneralContext);
  useEffect(() => {
    const ntfs = {
      read: read,
      unread: unread,
    };
    console.log(ntfs);
  }, []);

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 1 }}>
          {unread.map((_d: any, i: number) => (
            <NotificationCard key={i} notif={_d} theme={theme} read={false} />
          ))}
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 1 }}>
          {read.map((_d: any, i: number) => (
            <NotificationCard key={i} notif={_d} theme={theme} read={true} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

function NotificationCard(props: { notif: any; theme: any; read: boolean }) {
  const { notif, theme, read } = props;
  const { heading, message, date } = notif;
  return (
    <div
      className={`flex justify-between item-center md:gap-1 gap-4 border-[blue] border-b py-6 md:px-3`}
    >
      <div className="flex space-x-10">
        {read ? (
          <p>read</p>
        ) : (
          <Cancel
            className={`h-10 w-10 cursor-pointer text-[${theme?.primary_color}]`}
          />
        )}
        <div className="flex-col flex">
          <p className={`font-bold text-secondary-900`}>{heading}</p>
          <p>{message}</p>
        </div>
      </div>
      <div>
        <p>
          {moment(date).format("hh:mm:ss a")} <br />
          {moment(date).format("DD/mm/yyyy")}
        </p>
      </div>
    </div>
  );
}

// function NtfPad(props: { notif: any; theme: any; read: boolean }) {
//   const { notif, theme, read } = props;
//   const { heading, message, date } = notif;

//   return <div className=""></div>;
// }
