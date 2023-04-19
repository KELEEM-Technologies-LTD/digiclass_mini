import { LinearProgress } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import { formatCedis } from "../../../components/helpers";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function Transactions(props: {
  loading: boolean;
  transactions: any;
  theme: any;
}) {
  const { loading, theme, transactions } = props;

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
                <Link to={`/my-course/${_item}`}>
                  {_item}
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
      cell: (row: any) => moment(row.add_date).format("Do MMM YYYY"),
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
