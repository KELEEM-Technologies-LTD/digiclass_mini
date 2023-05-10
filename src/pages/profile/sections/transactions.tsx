import { LinearProgress } from "@mui/material";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { formatCedis } from "../../../components/helpers";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import CourseName from "./getCourseNameById";

export default function Transactions(props: {
  loading: boolean;
  transactions: any;
  theme: any;
}) {
  const { loading, theme, transactions } = props;
  const { corp_id } = useParams();

  // console.log(transactions);

  const columns = [
    {
      name: "Amount",
      cell: (row: any) => formatCedis(parseInt(row.amount)),
      width: "15%",
    },
    {
      name: "Course(s) purchase",
      cell: (row: any) => (
        <ul>
          {row.items?.map((_item: any, index: number) => {
            return (
              <li className="mb-3 list-disc" key={index}>
                <Link to={`/my-course/${_item}/${corp_id}`}>
                  <CourseName course_id={_item} />
                  {/* <CourseNameById id={_item} /> <OpenInNewIcon /> */}
                </Link>
              </li>
            );
          })}
        </ul>
      ),
      width: "35%",
    },
    {
      name: "Transaction Ref",
      cell: (row: any) => row.reference,
      width: "15%",
    },
    {
      name: "Date",
      cell: (row: any) => moment(row.add_date).format("LLL"),
      width: "15%",
    },
  ];

  return loading ? (
    <LinearProgress
      sx={{
        "& .MuiLinearProgress-bar": { backgroundColor: theme?.primary_color },
      }}
    />
  ) : (
    <Container className="p-3 mt-5">
      <DataTable
        columns={columns}
        data={transactions}
        progressPending={loading}
        // noDataComponent="no transa"
      />
    </Container>
  );
}
