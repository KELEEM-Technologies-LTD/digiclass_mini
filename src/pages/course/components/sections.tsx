import { Pause, PauseCircle, PlayCircle } from "@mui/icons-material";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import GeneralContext from "../../../context/gen";

export default function SingleSection(props: { data: any }) {
  const { theme, setCurrent, current } = useContext(GeneralContext);
  const { data } = props;
  const { name, course_id, url } = data;

  const handlePlay = () => {
    const current = {
      url: url,
      section_name: name,
      course_id: course_id,
    };
    setCurrent(current);
  };

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
          <Form.Check type="switch" label="Mark as completed" />
        </div>
      </div>
    </>
  );
}
