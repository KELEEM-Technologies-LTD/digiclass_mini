import { Fragment, useState, useContext } from "react";
import { StorageBox } from "../../../core/storage";
import { displaySuccess, displayWarning } from "../../../components/alert";
import urls from "../../../core/base.url";
import baseService from "../../../core/baseServices";
import { CircularProgress } from "@mui/material";
import GeneralContext from "../../../context/gen";
import { Container } from "react-bootstrap";

export default function ChangePassword() {
  const { theme, corpid } = useContext(GeneralContext);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [changing, setChanging] = useState<boolean>(false);

  const changePwd = async () => {
    if (oldPassword === "" || newPassword === "") {
      displayWarning("Please complete the form");
      displayWarning("Please complete the form");
    } else {
      try {
        setChanging(true);
        await baseService.put(
          `${urls.user}/${StorageBox.retrieveUserData()?.user_id}`,
          {
            prev_password: oldPassword,
            password: newPassword,
          }
        );
        displaySuccess("Password changed successfully, please login", () => {
          window.location.href = `/sign-in/${corpid}`;
          StorageBox.clearStorage();
        });
        // console.log(update);
      } catch (error) {
        displayWarning(
          "There was an error changing password, Please try again later"
        );
        setChanging(false);
        console.log(error);
        //   errorHelper(error);
      }
    }
  };

  return (
    <Fragment>
      <Container className="mt-5">
        <div className="grid grid-cols-12">
          <div className="md:col-span-8 col-span-12  grid md:grid-cols-2 grid-cols-1  gap-12 my-8">
            <div className="">
              <p>Old Password</p>
              <input
                placeholder="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e: any) => setOldPassword(e.target.value)}
                className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
              />
            </div>
            <div className="">
              <p>New password</p>
              <input
                placeholder="New password"
                type="password"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
              />
            </div>

            <div className="text-right">
              <button
                onClick={changePwd}
                className={`hover:bg-[${theme?.primary_color}] hover:text-[${theme?.secondary_color}] h-10 flex-col items-center flex rounded-5 border-[${theme?.primary_color}] border py-2 px-8 bg-transparent`}
                disabled={changing}
              >
                {changing ? <CircularProgress size={24} /> : "Change password"}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
