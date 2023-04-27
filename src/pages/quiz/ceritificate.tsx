import { useContext, useEffect, useState } from "react";
import GeneralContext from "../../context/gen";
import { StorageBox } from "../../core/storage";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { LinearProgress } from "@mui/material";
import { displayWarning } from "../../components/alert";
import { Image } from "react-bootstrap";
import CertificateCanvas from "./cert_canvas";

export default function Certificate() {
  const { theme, corpid, setCorpId } = useContext(GeneralContext);
  const navigate = useNavigate();
  const { corp_id, course_id } = useParams();
  useEffect(() => {
    if (StorageBox.retrieveUserData().corporate_id !== corp_id) {
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  useEffect(() => {
    get_data();
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<any>([]);
  const [cert, setCert] = useState<any>([]);
  const [cert_url, setCert_url] = useState<any>("/cert.png");

  const [ins_name, setName] = useState("");
  const get_data = async () => {
    const user: any = StorageBox.retrieveUserData();
    try {
      const course_res: any = await baseService.get(
        urls.getCourses +
          `/${course_id}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail,airtime`
      );

      if (course_res.data?.data?.certificate !== null) {
        setCert_url(course_res.data?.data?.certificate);
      } else {
        const image = process.env.PUBLIC_URL + "/cert.png";
        setCert_url(image);
      }

      console.log(course_res.data?.data?.certificate);

      const cert_res: any = await baseService.put(
        urls.getCerts + `/${user.user_id}/${course_id}`,
        {
          name: user.first_name + " " + user.last_name,
        }
      );
      const instructor_res: any = await baseService.get(
        urls.user + `/${course_res.data?.data?.instructor}`
      );
      //   console.log(instructor_res.data?.data?.first_name);
      setName(
        instructor_res.data?.data?.first_name +
          " " +
          instructor_res.data?.data?.last_name
      );

      setCert(cert_res.data.payload);
      setCourse(course_res.data.data);
      setLoading(false);
    } catch (error) {
      displayWarning("Certificate not found");
    }
  };

  return loading ? (
    <LinearProgress />
  ) : (
    <>
      <CertificateCanvas
        cert={cert}
        course={course}
        ins_name={ins_name}
        cert_url={cert_url}
      />
    </>
  );
}
