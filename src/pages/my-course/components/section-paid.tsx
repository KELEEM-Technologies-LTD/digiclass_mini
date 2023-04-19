import { Pause, PauseCircle, PlayCircle } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import GeneralContext from "../../../context/gen";
import { StorageBox } from "../../../core/storage";
import baseService from "../../../core/baseServices";
import urls from "../../../core/base.url";

export default function SinglePaidSection(props: {
  videos: any;
  sections: any;
}) {
  const { theme, setCurrent, current } = useContext(GeneralContext);
  const { videos, sections } = props;
  const { name, course_id, section_id } = sections;

  //   console.log(videos);
  //   console.log(videos);

  const handlePlay = () => {
    const current = {
      url: videos[section_id][0]?.url,
      section_name: name,
      course_id: course_id,
      paid: false,
    };
    setCurrent(current);
    console.log(current);
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
    } catch (err) {}
  };

  const getStatus = async () => {
    const user = StorageBox.retrieveUserData();
    try {
      const res: any = await baseService.get(
        urls.getSectionStatus + `/${user.user_id}/${section_id}`
      );

      //   console.log(res.data?.payload);
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
      <div className="d-flex justify-content-between px-4">
        <div className="d-flex">
          {current?.section_name === name ? (
            <PauseCircle
              style={{
                color: theme?.primary_color,
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={handlePlay}
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
        </div>
      </div>
    </>
  );
}
