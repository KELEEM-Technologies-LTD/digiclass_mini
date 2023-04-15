import { Navigate, Outlet, useParams } from "react-router-dom";
import { StorageBox } from "../core/storage";

export default function PrivateRoute() {
  const { corp_id } = useParams();
  return StorageBox.getAccessToken() !== null &&
    StorageBox.retrieveUserData() !== null ? (
    <Outlet />
  ) : (
    <Navigate to={`/sign-in/${corp_id}`} />
  );
}
