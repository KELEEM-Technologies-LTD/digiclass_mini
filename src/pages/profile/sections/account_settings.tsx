import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { Container } from "react-bootstrap";
import baseService from "../../../core/baseServices";
import urls from "../../../core/base.url";
import { StorageBox } from "../../../core/storage";
import { displaySuccess } from "../../../components/alert";

export default function AccountSettings(props: {
  user: any;
  loading: boolean;
  theme: any;
  getData: () => void;
}) {
  const { user, loading, theme, getData } = props;
  const {
    first_name,
    last_name,
    profile_pic,
    dob,
    resume,
    user_id,
    location,
    msisdn,
  } = user;

  console.log(user);

  const [fname, setFname] = useState<string>(first_name);
  const [lname, setlanme] = useState<string>(last_name);
  const [formdob, setDob] = useState(dob ? dob : "2000-01-01");
  const [formresume, setResume] = useState(resume ? resume : "");
  const [loc, setLoc] = useState(location ? location : "");
  const [phone, setPhone] = useState(msisdn ? msisdn : "");

  const saveChanges = async () => {
    const payload = {
      first_name: fname || first_name,
      last_name: lname || last_name,
      dob: formdob || dob,
      resume: formresume || resume,
      location: loc || location,
      msisdn: phone || msisdn,
    };
    console.log(payload);
    try {
      const user: any = StorageBox.retrieveUserData();

      const response: any = await baseService.put(
        urls.updateProfile + `/${user.user_id}`,
        payload
      );

      if (response?.data?.data) {
        displaySuccess(response?.data?.data?.message);
        console.log(response?.data?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <LinearProgress
      sx={{
        "& .MuiLinearProgress-bar": { backgroundColor: theme?.primary_color },
      }}
    />
  ) : (
    <Container className="mt-5">
      {/* <Row>
        <Col md={5}>
          <ProfilePicChange
            getUserInformation={getData}
            profile_pic={user?.profile_pic}
          />
        </Col>
      </Row> */}
      <div className="grid grid-cols-12">
        <div className="md:col-span-8 col-span-12  grid md:grid-cols-2 grid-cols-1  gap-12 my-8">
          <div className="">
            <p>First Name</p>
            <input
              placeholder="First name"
              type="text"
              name="fname"
              value={fname}
              onChange={(e: any) => setFname(e.target.value)}
              className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
            />
          </div>
          <div className="">
            <p>Last Name</p>
            <input
              placeholder="Last name"
              type="text"
              name="lastName"
              value={lname}
              onChange={(e: any) => setlanme(e.target.value)}
              className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
            />
          </div>
          <div className="">
            <p>Phone</p>
            <input
              placeholder="Phone number"
              type="tel"
              name="phone"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
              className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
            />
          </div>
          <div className="">
            <p>Location</p>
            <input
              placeholder="Location"
              type="text"
              name="loc"
              value={loc}
              onChange={(e: any) => setLoc(e.target.value)}
              className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
            />
          </div>
          <div>
            <p>Date of birth</p>
            <input
              placeholder="Location"
              type="date"
              name="formdob"
              value={formdob}
              onChange={(e: any) => setDob(e.target.value)}
              className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
            />
          </div>
          <div>
            <p>Bio</p>
            <textarea
              id="message"
              rows={3}
              cols={6}
              className="py-5  border rounded-5 w-full  justify-between focus:outline-none font-serif border-primary-600 px-4 bg-primary-100"
              placeholder="Write a short description about yourself"
              value={formresume}
              onChange={(e: any) => setResume(e.target.value)}
            ></textarea>
          </div>

          <div className="text-right">
            <button
              onClick={saveChanges}
              className={`hover:bg-[${theme?.primary_color}] hover:text-[${theme?.secondary_color}] h-10 flex-col items-center flex rounded-5 border-[${theme?.primary_color}] border py-2 px-8 bg-transparent`}
              //   disabled={updating}
            >
              {/* {updating ? (
                        <CircularProgress size={24} />
                      ) : (
                          )} */}
              Save changes
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

function InputWithIcon(props: any) {
  const {
    icon,
    icon1,
    className,
    type,
    error,
    placeholder,
    disabled,
    value,
    onChange,
  } = props;
  const ring = error ? `ring-1 ring-secondary` : "";
  return (
    <div className={` ${className} ${disabled ? "bg-primary-200" : ""} `}>
      {icon1 ? (
        <span className="flex justify-center items-center px-4">
          <img src={icon1} alt="e0m" />
        </span>
      ) : null}
      <input
        data-testid="input"
        className={`focus:outline-none font-serif border-primary-300 px-4 bg-primary-100  ${
          disabled ? "bg-primary-200" : ""
        }   w-full ${ring} `}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {icon ? (
        <span className="flex justify-center items-center px-4">
          <i className={icon}></i>
        </span>
      ) : null}
    </div>
  );
}
