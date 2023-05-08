import { useEffect, useState } from "react";
import urls from "../core/base.url";
import baseService from "../core/baseServices";
import { StorageBox } from "../core/storage";
import GeneralContext from "./gen";
import FloatingPlayer from "../components/floating_player";
import { errorHelper } from "../components/helpers";

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
        const res: any = await baseService.get(urls.courses + `/${corpid}?`);
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

  const [read, setRead] = useState<any>([]);
  const [unread, setUnread] = useState<any>([]);
  const get_notifications = async () => {
    const user: any = StorageBox.retrieveUserData();
    try {
      const notification_payload: any = await baseService.get(
        urls.notifications + `/${user.user_id}`
      );
      // console.log(notification_payload.data?.payload);
      const notifications = notification_payload.data?.payload;

      const seenArr: any = notifications.filter((obj: any) =>
        obj.view?.includes(user.user_id)
      );
      setRead(seenArr);

      const notSeenArr: any = notifications.filter(
        (obj: any) => !obj.view?.includes(user.user_id)
      );

      // console.log(notifications);
      setUnread(notSeenArr);
    } catch (error) {
      // displayWarning("Error loading notifications");
    }
  };

  useEffect(() => {
    get_notifications();
  }, []);

  const [myCourseLoading, setMyCourseLoading] = useState<boolean>(true);
  const [myCourseArray, setMyCourseArray] = useState<any>([]);
  const [myCourse, setMyCourse] = useState<any>([]);
  const get_my_course = async () => {
    try {
      if (StorageBox.getAccessToken() !== null) {
        const user: any = StorageBox.retrieveUserData();
        const response: any = await baseService.get(
          urls.getmypaidc + `/${user.user_id}`
        );

        const arr = response.data?.payload?.map((d: any) => d.course_id);
        setMyCourseArray(arr);
        setMyCourse(response.data?.payload);
        setMyCourseLoading(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    get_my_course();
  }, []);

  const [player, setPlayer] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>(null);

  /**
   * Handle hidden course
   */
  const [hiddenLoading, setHiddenLoading] = useState<boolean>(true);
  const [hiddenCourses, setHiddenCourses] = useState<any>([]);
  const get_hidden_course = async () => {
    try {
      const res: any = await baseService.get(
        urls.hidden_courses + `/${StorageBox.retrieveUserData().user_id}`
      );

      console.log(res?.data?.payload);
      setHiddenCourses(res?.data?.payload);
      setHiddenLoading(false);
    } catch (error) {
      errorHelper(error);
    }
  };

  useEffect(() => {
    get_hidden_course();
  }, []);

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
        setCourseLoading,
        courses,
        setCourses,
        player,
        setPlayer,
        current,
        setCurrent,

        read,
        unread,
        get_notifications,

        //Courses
        myCourseLoading,
        myCourse,
        myCourseArray,
        setMyCourseLoading,

        //Hidden Courses
        hiddenLoading,
        hiddenCourses,
      }}
    >
      {children}
      <FloatingPlayer />
    </GeneralContext.Provider>
  );
}
