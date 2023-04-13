import { Navigate, Outlet } from "react-router-dom";
import { StorageBox } from "../core/storage";

export default function PrivateRoute() {
  return StorageBox.getAccessToken() !== null &&
    StorageBox.retrieveUserData() !== null ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
}
