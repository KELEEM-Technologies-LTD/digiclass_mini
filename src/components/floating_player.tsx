import { Fullscreen, PlayCircleOutline } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../context/gen";

export default function FloatingPlayer() {
  const navigate = useNavigate();
  const { setPlayer, player, current, corpid } = useContext(GeneralContext);
  const [playing, setPlaying] = useState<boolean>(true);

  return player ? (
    <Card
      className="position-fixed bottom-0 end-0 mb-3 ms-3"
      style={{ width: "30rem", height: "20rem", zIndex: 10000 }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="text-center">
            {current?.section_name}
          </Card.Title>
          <Fullscreen
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(
                current?.paid === true
                  ? `/my-course/${current?.course_id}/${corpid}`
                  : `/course/${current?.course_id}/${corpid}`
              );
              setPlayer(false);
            }}
          />
        </div>
        <ReactPlayer
          width="100%"
          height="15em"
          url={current?.url}
          playIcon={
            <PlayCircleOutline className="w-4 h-4" style={{ color: "green" }} />
          }
          playing={playing}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          controls={true}
        />
      </Card.Body>
    </Card>
  ) : null;
}
