import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import urls from "../../../core/base.url";
import baseService from "../../../core/baseServices";

export default function Files(props: { course_id: any }) {
  const { course_id } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const note_res: any = await baseService.get(urls.files + `/${course_id}`);
      // console.log(note_res?.data?.payload[0]);
      setNotes(note_res?.data?.payload);
      setLoading(false);
    } catch (error) {
      //   console.log(error);
    }
  };

  return loading ? (
    <div className="flex items-center justify-center h-[30vh]">
      <CircularProgress />
    </div>
  ) : notes.length === 0 ? (
    <div className="flex justify-center">No files attached to this course</div>
  ) : (
    notes.map((_d: any, i: number) => {
      return (
        <div
          key={i}
          className="flex flex-row justify-between items-center mb-3"
        >
          <div className="flex flex-row items-center">
            <img
              alt="world"
              src={_d?.data?.url_thumbnail ?? "/adImage.png"}
              style={{ height: "45px", width: "45px" }}
            />
            <div style={{ fontSize: 16, fontWeight: 400, marginLeft: 20 }}>
              {_d?.data?.payload?.public_id ?? "Course file.pdf"}
            </div>
            <div
              style={{ cursor: "pointer", marginLeft: 20 }}
              onClick={() =>
                window.open(`${_d?.data?.payload?.url_download}`, "_blank")
              }
            >
              <img alt="" src="/cloud.png" />
            </div>
          </div>
        </div>
      );
    })
  );
}
