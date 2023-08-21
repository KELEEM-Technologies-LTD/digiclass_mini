import CryptoJS from "crypto-js";
const SECRET_KEY = "mawulis_secrete_juice";

export const StorageBox = {
  getAccessToken: () => {
    const tokenDataString = localStorage.getItem("encryptedToken");
    if (tokenDataString) {
      const tokenData = JSON.parse(tokenDataString);
      //   console.log(tokenData, currentTime);
      const { token, expiration } = tokenData;
      const currentTime = new Date().getTime();
      if (expiration && currentTime < expiration) {
        const decryptedToken = CryptoJS.AES.decrypt(
          token,
          "encryptionSecretKey"
        ).toString(CryptoJS.enc.Utf8);
        return decryptedToken;
      }
    }
    return null;
  },
  saveAccessToken: (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(
      token,
      "encryptionSecretKey"
    ).toString();
    const expirationDate = new Date().getTime() + 10 * 60 * 60 * 1000; // 10 hours expiration
    const tokenData = {
      token: encryptedToken,
      expiration: expirationDate,
    };
    localStorage.setItem("encryptedToken", JSON.stringify(tokenData));
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
