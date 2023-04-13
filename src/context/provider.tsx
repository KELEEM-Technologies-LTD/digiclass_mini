import { useEffect, useState } from "react";
import GeneralContext from "./gen";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { corp_id } from "../core/corporate.info";
import { StorageBox } from "../core/storage";

export default function ContextProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<any>([]);
  const getTheme = async () => {
    try {
      const res: any = await baseService.get(urls.theme + `/${corp_id}`);
      // console.log(res?.data);
      setTheme(res?.data?.payload);
      setLoading(false);
      setUser(StorageBox.retrieveUserData() ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <GeneralContext.Provider value={{ loading, theme, user }}>
      {children}
    </GeneralContext.Provider>
  );
}
