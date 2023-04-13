import { CircularProgress } from "@mui/material";

export default function LoadingOverLay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <CircularProgress
        size={100}
        style={{ marginLeft: "16px", color: "#4080FF" }}
      />
    </div>
  );
}
