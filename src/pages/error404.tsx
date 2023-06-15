import { Fragment, useEffect, useState } from "react";
import { StorageBox } from "../core/storage";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { LinearProgress } from "@mui/material";

export default function Error404() {
  const [loading, setLoading] = useState<boolean>(true);
  const [corporateIds, setCorporateIds] = useState<any>([]);

  const get_data = async () => {
    try {
      const response: any = await baseService.get(urls.corporate_ids);
      console.log(response.data?.payload);
      setCorporateIds(response.data?.payload);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <Fragment>
      <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-6">
            404 Error - Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for could not be found.
          </p>
          {loading ? (
            <LinearProgress />
          ) : (
            <Fragment>
              <h2 className="text-2xl font-bold mb-4">Available:</h2>
              <ul className="list-disc list-inside">
                {corporateIds.map((_d: any, i: number) => (
                  <li key={i}>
                    <a
                      href={`/sign-in/${_d.corporate_id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {_d.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Fragment>
          )}
        </div>
        {/* <p>958204d5604f48d4876dd3e535dba5d1</p> */}
      </div>
    </Fragment>
  );
}
