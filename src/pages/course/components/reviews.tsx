import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export default function Review(props: { data: any }) {
  const { data } = props;
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>Review</Col>
    </Row>
  );
}
