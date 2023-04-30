import { ExpandMore } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
} from "@mui/material";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function Faq(props: { data: any }) {
  const { data } = props;

  return (
    <>
      <Row>
        <Col md={8}>
          {data.length === 0 ? (
            <>There are no FAQs available for this course</>
          ) : (
            data.map((_d: any, i: number) => <Accord data={_d} key={i} />)
          )}
        </Col>
      </Row>
    </>
  );
}

function Accord(props: { data: any }) {
  const { data } = props;
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (event: any, isExpanded: any) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="h6">{data.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{data.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
