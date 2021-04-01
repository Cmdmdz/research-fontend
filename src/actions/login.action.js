import { httpClient } from "utils/HttpClient";
import authHeader from "utils/auth-header";

import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  server,
  LOGIN_STATUS,
} from "../Constants";
// import authHeader from "./AuthHeader";

export const setStateToFetching = () => ({
  type: LOGIN_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
});

export const setStateToLogout = () => ({
  type: LOGOUT,
});

export const setSuccess = (payload) => {
  return (dispatch) => {
    dispatch(setStateToSuccess(payload));
  };
};

export const hasError = (payload) => {
  return (dispatch) => {
    dispatch(setStateToFailed(payload));
  };
};

export const login = ({ username, password, history }) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    const result = await httpClient
      .post(server.LOGIN_URL, {
        username,
        password,
      })
      .then(
        (result) => {
          if (result.data.access_token) {
            localStorage.setItem("user", JSON.stringify(result.data));
            dispatch(setStateToSuccess(result.data));
           
            if(result.data.roles[0] == "ROLE_USER"){
              history.push("/admin/research");
            }else {
              history.push("/admin/report");
            }
          } else {
            localStorage.setItem(LOGIN_STATUS, "nok");
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("error : ", resMessage);
          dispatch(setStateToFailed(resMessage));
        }
      );
  };
};

export const logout = ({ history }) => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch(setStateToLogout());
    history.push("/");
  };
};

export const isLoggedIn = () => {
  const loginstatus = JSON.parse(localStorage.getItem("user"));
  return loginstatus != null;
};


export const reLogin = () => {
  return (dispatch) => {
    const loginstatus = JSON.parse(localStorage.getItem("user"));
    console.log("loginstatus: ", loginstatus);
    if (loginstatus != null) {
      dispatch(setStateToSuccess({}));
    }
  };
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


export const updateProfile = (values) => {
  return async (dispatch) => {
    await httpClient.put(server.ACCOUBT_URL, values, {
      headers: authHeader(),
    } )
  }
}

export const getAllAccount = () => {
  return  httpClient.get(server.ACCOUBT_URL,  {
    headers: authHeader(),
  });
};

export const getAllAccountById = (id) => {
  return httpClient.get(`${server.ACCOUBT_URL}/${id}`, {
    headers: authHeader(),
  });
};


