import { CircularProgress, LinearProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import baseService from "../../../core/baseServices";
import urls from "../../../core/base.url";
import { StorageBox } from "../../../core/storage";
import { displaySuccess, displayWarning } from "../../../components/alert";
import GeneralContext from "../../../context/gen";

export default function AccountSettings() {
  const { theme } = useContext(GeneralContext);
  const currentDate = new Date();
  const minDateOfBirthValue = new Date(
    currentDate.getFullYear() - 16,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minDateOfBirthFormatted = minDateOfBirthValue
    .toISOString()
    .split("T")[0];

  const [fname, setFname] = useState<string>("");
  const [lname, setlanme] = useState<string>("");
  const [formdob, setDob] = useState("");
  const [loc, setLoc] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState<any>([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      const user: any = StorageBox.retrieveUserData();
      const usr: any = await baseService.get(urls.getUser + `/${user.user_id}`);

      if (usr?.data?.data) {
        const load = usr?.data?.data;
        setFname(load.first_name || "");
        setlanme(load.last_name || "");
        setPhone(load?.msisdn || "");
        setLoc(load?.location || "");
        setDob(load?.dob || "2000-01-01");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const saveChanges = async () => {
    if (loc.length < 1) {
      displayWarning("Location must not be empty!");
      return;
    }

    if (phone.length < 10) {
      displayWarning("Phone number must be 10 digit!");
      return;
    }

    const payload = {
      first_name: fname,
      last_name: lname,
      dob: formdob,
      location: loc,
      msisdn: phone,
    };

    try {
      setLoading(true);
      const user: any = StorageBox.retrieveUserData();

      const response: any = await baseService.put(
        urls.updateProfile + `/${user.user_id}`,
        payload
      );

      if (response?.data?.data) {
        const usr: any = await baseService.get(
          urls.getUser + `/${user.user_id}`
        );
        const load = usr?.data?.data;

        setFname(load.first_name || "");
        setlanme(load.last_name || "");
        setPhone(load?.msisdn || "");
        setLoc(load?.location || "");
        setDob(load?.dob || "2000-01-01");

        displaySuccess(response?.data?.data?.message, () => {
          const userNew: any = StorageBox.retrieveUserData();
          userNew.first_name = fname;
          userNew.last_name = lname;
          userNew.dob = formdob;
          userNew.location = loc;
          userNew.msisdn = phone;
          StorageBox.saveUserData(userNew);
        });
        // console.log(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error);
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
              max={minDateOfBirthFormatted}
              onChange={(e: any) => setDob(e.target.value)}
              className="py-2 border-primary-600 px-3 outline-none border rounded-5 w-full  flex  bg-primary-100  justify-between"
            />
          </div>

          <div className="text-right">
            <button
              onClick={saveChanges}
              className={`hover:bg-[${theme?.primary_color}] hover:text-[${theme?.secondary_color}] h-10 flex-col items-center flex rounded-5 border-[${theme?.primary_color}] border py-2 px-8 bg-transparent`}
              //   disabled={updating}
            >
              {loading ? <CircularProgress size={24} /> : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export function InputWithIcon(props: any) {
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
