import { LinearProgress } from "@mui/material";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { formatCedis } from "../../../components/helpers";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import CourseName from "./getCourseNameById";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useContext } from "react";
import { CurrencyContext } from "../../../context/CurrencyContext";

export default function Transactions(props: {
  loading: boolean;
  transactions: any;
  theme: any;
}) {
  const { convertValue } = useContext(CurrencyContext);
  const { loading, theme, transactions } = props;
  const { corp_id } = useParams();

  // console.log(transactions);

  const columns: GridColDef[] = [
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        formatCedis(parseInt(params.row.amount), "GHS"),
    },
    {
      field: "items",
      headerName: "Course(s) purchase",
      width: 320,
      renderCell: (params: GridRenderCellParams) => {
        const ids = params.row.items;
        return (
          <ul>
            {params.row.items?.map((_item: any, index: number) => (
              <li className="mb-3 list-disc" key={index}>
                <Link to={`/my-course/${_item}/${corp_id}`}>
                  <CourseName course_id={_item} />
                </Link>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      field: "reference",
      headerName: "Transaction Ref",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row.add_date).format("LLL"),
    },
  ];

  return loading ? (
    <LinearProgress
      sx={{
        "& .MuiLinearProgress-bar": { backgroundColor: theme?.primary_color },
      }}
    />
  ) : (
    <div style={{ width: "100%" }} className="min-h-[50vh] w-full mt-5 p-3">
      <DataGrid
        rows={transactions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        sx={{ width: "100%" }}
        // checkboxSelection
      />
    </div>
  );
}
