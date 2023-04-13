import CryptoJS from "crypto-js";
const SECRET_KEY = "mawulis_secrete_juice";

export const StorageBox = {
  getAccessToken: () => {
    const encryptedData = localStorage.getItem("token_access");
    if (encryptedData !== null) {
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      return decryptedData;
    }
    return null;
  },
  saveAccessToken: (token) => {
    const encryptedData = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    localStorage.setItem("token_access", encryptedData);
  },
  saveUserData: (data) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();
    localStorage.setItem("userData", encryptedData);
  },
  retrieveUserData: () => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData !== null) {
      const decryptedData = JSON.parse(
        CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(
          CryptoJS.enc.Utf8
        )
      );
      // console.log(decryptedData);
      return decryptedData;
    } else {
      return null;
    }
  },
  clearStorage: () => {
    localStorage.clear();
  },
};
