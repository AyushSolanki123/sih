import axios from "axios";
import env from "./ApiEnv";
import { LocalStorage } from "quasar";

//Auth api start

export function loginUser(login) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "POST",
      url: env.baseUrl + env.login,
      data: login,
    })
      .then((response) => {
        if (response) {
          resolve({ loginDone: true, data: response.data });
        } else {
          console.log(error);
          reject({ loginDone: false, error: error });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function loginStatus(authToken) {
  return new Promise(function (resolve, reject) {
    apiActionWithToken({
      method: "POST",
      url: env.baseUrl + env.status,
      data: { authToken: authToken },
    })
      .then((response) => {
        if (response) {
          resolve({ response: response.data });
        } else {
          console.log(error);
          reject({ error: error });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function logOutUser() {
  return new Promise(function (resolve, reject) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    resolve();
  });
}

export function registerUser(register) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "POST",
      url: env.baseUrl + env.register,
      data: register,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function updateUser(userInfo) {
  return new Promise(function (resolve, reject) {
    apiActionWithToken({
      method: "PUT",
      url: env.baseUrl + env.updateUser,
      data: userInfo,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function getUserById(userId) {
  return new Promise(function (resolve, reject) {
    apiActionWithToken({
      method: "PUT",
      url: env.baseUrl + env.getUserById.replace("{userId}", userId),
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function passwordResetToken(email) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "POST",
      url: env.baseUrl + env.sendResetToken,
      data: email,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function verifyOtp(data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "POST",
      url: env.baseUrl + env.verifyOtp,
      data: data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

//Auth Api End

export function createHistory(reqBody) {
  return new Promise(function (resolve, reject) {
    apiActionWithToken({
      method: "POST",
      url: env.baseUrl + env.createHistory,
      data: reqBody,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Helper functions
function apiActionWithToken(options) {
  return new Promise(function (resolve, reject) {
    let authToken = null;
    let refreshToken = null;
    authToken = localStorage.getItem("authToken");
    refreshToken = localStorage.getItem("refreshToken");
    // console.log(authToken);
    if (authToken && refreshToken) {
      options.headers = { ...options.headers, authorization: authToken };
      axios(options)
        .then((apiResponse) => {
          resolve(apiResponse);
        })
        .catch((error) => {
          console.log("ereor", error);
          if (error?.response?.status === 401) {
            refreshJWT(refreshToken)
              .then(() => {
                apiActionWithToken(options);
              })
              .catch((error) => {
                console.log("eror", error);
                reject(error);
              });
          } else {
            reject(error);
          }
        });
    } else {
      reject("Unable to get the token pair");
    }
  });
}

function refreshJWT(refreshToken) {
  return new Promise(function (resolve, reject) {
    axios
      .post(env.baseUrl + env.refreshToken, {
        refreshToken: refreshToken,
      })
      .then((apiResponse) => {
        if (apiResponse.status >= 200 && apiResponse.status <= 209) {
          console.log(apiResponse);
          localStorage.setItem("authToken", apiResponse.data.authToken);
          // localStorage.setItem('refreshToken', refreshToken);
          // localStorage.setItem('userId', apiResponse.data.user._id);
          resolve();
        } else {
          reject("Unable to refresh the token at the moment");
        }
      })
      .catch((error) => {
        console.log(error);
        reject("Unable to refresh the token at the moment");
        logOutUser();
      });
  });
}
