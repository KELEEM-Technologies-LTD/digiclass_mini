import { useEffect, useState } from "react";
import baseService from "../../../core/baseServices";
import urls from "../../../core/base.url";

export default function CourseName(props: { course_id: string }) {
  const { course_id } = props;
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getCourseName = async () => {
    try {
      const response: any = await baseService.get(
        urls.getCourses + `/${course_id}`
      );
      setName(response?.data?.data?.title);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getCourseName();
  }, []);

  return loading ? <></> : <p>{name}</p>;
}
