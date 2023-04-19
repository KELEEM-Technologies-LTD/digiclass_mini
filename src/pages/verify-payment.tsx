import { useLocation, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { StorageBox } from "../core/storage";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { displaySuccess, displayWarning } from "../components/alert";

const VerifyTransactions = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trxRef = searchParams.get("trxref");
  const reference = searchParams.get("reference");
  const { corp_id } = useParams();

  const verifyTransaction = async () => {
    if (reference && trxRef) {
      const verify_data = {
        reference: reference,
      };
      //   console.log(verify_data);
      const user = StorageBox.retrieveUserData();
      try {
        await baseService.put(
          urls.verifyTransactions + `/${user.user_id}`,
          verify_data
        );

        displaySuccess("Transaction successful", () => {
          window.location.href = `/account/${corp_id}?tab=2`;
        });
      } catch (error) {
        displayWarning("Transaction verification failed", 2000, () => {
          window.location.href = `/account/${corp_id}?tab=2`;
        });
        console.log(error);
      }
    } else {
      displayWarning(
        "Transaction verification failed, transaction id not found",
        2000,
        () => {
          window.location.href = `/account/${corp_id}?tab=2`;
        }
      );
    }
  };

  useEffect(() => {
    // console.log(corp_id);
    verifyTransaction();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-primary-200">
        <CircularProgress color="primary" size={60} thickness={5} />
      </div>
    </>
  );
};

export default VerifyTransactions;
