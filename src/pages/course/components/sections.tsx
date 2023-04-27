import { Pause, PauseCircle, PlayCircle } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import GeneralContext from "../../../context/gen";
import { StorageBox } from "../../../core/storage";
import urls from "../../../core/base.url";
import baseService from "../../../core/baseServices";

export default function SingleSection(props: { data: any; checkStatus: any }) {
  const { theme, setCurrent, current } = useContext(GeneralContext);
  const { data, checkStatus } = props;
  const { name, course_id, url, section_id } = data;
  // console.log(data);

  const handlePlay = () => {
    const current = {
      url: url,
      section_name: name,
      course_id: course_id,
    };
    setCurrent(current);
  };

  const [checked, setChecked] = useState<boolean>(false);

  const handleChecked = async () => {
    const user: any = StorageBox.retrieveUserData();
    try {
      await baseService.put(
        urls.updateSection + `/${user.user_id}/${course_id}/${section_id}`,
        {}
      );

      // console.log(res);
      setChecked(!checked);
      checkStatus();
    } catch (err) {}
  };

  const getStatus = async () => {
    const user = StorageBox.retrieveUserData();
    try {
      const res: any = await baseService.get(
        urls.getSectionStatus + `/${user.user_id}/${section_id}`
      );

      // console.log(res.data?.payload);
      if (res.data?.payload?.length === 0) {
        setChecked(false);
      } else {
        setChecked(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <div className="flex mb-3 ml-5">
        {current?.section_name === name ? (
          <PauseCircle
            style={{
              color: theme?.primary_color,
            }}
            onClick={handlePlay}
            className="w-7 h-7 mr-2 cursor-pointer"
          />
        ) : (
          <PlayCircle
            style={{
              color: theme?.primary_color,
            }}
            className="w-7 h-7 mr-2 cursor-pointer"
            onClick={handlePlay}
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm">{name}</p>
        </div>
        <div className="ml-auto text-sm">
          <Form.Check
            type="switch"
            label="Mark as completed"
            checked={checked}
            onChange={handleChecked}
          />
        </div>
      </div>

      {/* <div className="flex mb-3 ml-5">
        {current?.section_name === name ? (
          <PauseCircle
            style={{
              color: theme?.primary_color,
              marginRight: "5px",
            }}
            onClick={handlePlay}
            className="w-7 h-7 mr-2 cursor-pointer"
          />
        ) : (
          <PlayCircle
            style={{
              color: theme?.primary_color,
              marginRight: "5px",
              cursor: "pointer",
            }}
            onClick={handlePlay}
          />
        )}
        <p>{name}</p>
      </div>
      <div>
        <Form.Check
          type="switch"
          label="Mark as completed"
          checked={checked}
          onChange={handleChecked}
        />
      </div> */}
    </>
  );
}
