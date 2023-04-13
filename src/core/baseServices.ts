import axios, { AxiosError, AxiosResponse } from "axios";
import { StorageBox } from "./storage";

interface Config {
  method: string;
  url: string;
  headers: {
    Accept: string;
    'x-access-token': any;
  };
  data?: any;
}

const baseService = {
  /**
   * BASE PUT
   * ------------------
   * base service for all put services in the application
   * @param {string} url
   * @param {object} data
   * @returns {Promise<Response>}
   */
  put: async (
    url: string,
    data: any
  ): Promise<AxiosError | AxiosResponse> => {
    console.log("link of request", url);
    const config: Config = {
      method: "put",
      url,
      headers: {
        Accept: "application/json",
        'x-access-token': StorageBox.getAccessToken(),
      },
      data: data,
    };
    console.log(StorageBox.getAccessToken())
    const response: AxiosResponse = await axios(config);
    return response;
  },
  /**
   * BASE GET
   * ------------------
   * base service for all get services in the application
   * @param {string} url
   * @param {object} data
   * @returns {Promise<AxiosError | AxiosResponse>}
   */
  get: async (
    url: string,
    data?: any
  ): Promise<AxiosError | AxiosResponse> => {
    // console.log("link of request", url);
    const config: Config = {
      method: "get",
      url,
      headers: {
        Accept: "application/json",
        'x-access-token': StorageBox.getAccessToken(),
      },
      data: data,
    };
    const response: AxiosResponse = await axios(config);
    return response;
  },

  /**
   * BASE POST
   * ------------------
   * base service for all post services in the application
   * @param {string} url
   * @param {object} data
   *
   */
  post: async (
    url: string,
    data: any
  ): Promise<AxiosError | AxiosResponse> => {
    const config: Config = {
      method: "post",
      url,
      headers: {
        Accept: "application/json",
        'x-access-token': StorageBox.getAccessToken(),
      },
      data: data,
    };

    const response: AxiosResponse = await axios(config);
    return response;
  },
  patch: async (
    url: string,
    data: any
  ): Promise<AxiosError | AxiosResponse> => {
    console.log(data);
    const config: Config = {
      method: "patch",
      url,
      headers: {
        Accept: "application/json",
        'x-access-token': StorageBox.getAccessToken(),
      },
      data,
    };
    const response = await axios(config);
    return response;
  },
  delete: async (url: string): Promise<AxiosError | AxiosResponse> => {
    const config: Config = {
      method: "delete",
      url,
      headers: {
        Accept: "application/json",
        'x-access-token': StorageBox.getAccessToken(),
      },
    };

    const response = await axios(config);
    return response;
  },
};

export default baseService;
