import { useEffect, useState } from "react";
import urls from "../core/base.url";
import baseService from "../core/baseServices";
import { StorageBox } from "../core/storage";
import GeneralContext from "./gen";
import FloatingPlayer from "../components/floating_player";

export default function ContextProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<any>([]);
  const [corpid, setCorpId] = useState<string>("");

  const getTheme = async () => {
    if (corpid !== "") {
      try {
        const res: any = await baseService.get(urls.theme + `/${corpid}`);
        // console.log(res?.data);
        setTheme(res?.data?.payload);
        setLoading(false);
        setUser(StorageBox.retrieveUserData() ?? []);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getTheme();
  }, [corpid]);

  const [courseLoading, setCourseLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<any>([]);
  const get_course = async () => {
    if (corpid !== "") {
      try {
        const res: any = await baseService.get(urls.courses + `/${corpid}`);
        // console.log(res.data?.payload);
        setCourses(res.data?.payload);
        setCourseLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    get_course();
  }, [corpid]);

  const [player, setPlayer] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>(null);

  return (
    <GeneralContext.Provider
      value={{
        loading,
        theme,
        corpid,
        setCorpId,
        user,
        get_course,
        courseLoading,
        courses,
        player,
        setPlayer,
        current,
        setCurrent,
      }}
    >
      {children}
      <FloatingPlayer />
    </GeneralContext.Provider>
  );
}
