import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { StorageBox } from "../../../core/storage";
import baseService from "../../../core/baseServices";
import urls from "../../../core/base.url";
import { displayWarning } from "../../../components/alert";

const ProfilePicChange = (props: {
  profile_pic: string;
  getUserInformation: () => void;
}) => {
  const { profile_pic, getUserInformation } = props;

  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event: any) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
    const data = new FormData();

    data.append("file", event.target.files[0]);

    const userdata = StorageBox.retrieveUserData();

    console.log(data);

    // ${userdata.user_id}/profile
    try {
      const res: any = await baseService.post(
        urls.user + `/${userdata.user_id}/profile`,
        data
      );
      console.log(res);
      getUserInformation();
    } catch (error: any) {
      setLoading(false);
      displayWarning(
        error.response?.data?.message ?? "Error changing user icon"
      );
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="relative">
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={
              loading
                ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                : profile_pic
            }
            alt={profile_pic}
          />
          <label htmlFor="imageUploadBtn" className="absolute top-20 left-0">
            <span className="bg-primary-200 opacity-50 px-12 pb-5 pt-3 cursor-pointer text-secondary-800">
              <EditIcon />
            </span>
            <input
              type="file"
              id="imageUploadBtn"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="flex">
          <div className="mt-1">
            <h1 className="font-bold text-base">Change Profile picture</h1>
            <small>Your profile picture can be changed once per month</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePicChange;
