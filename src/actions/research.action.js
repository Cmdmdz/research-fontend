import { RES_FETCHING, RES_SUCCESS, RES_FAILED, server } from "Constants";
import { httpClient } from "utils/HttpClient";
import authHeader from "utils/auth-header";
import http from "utils/http-common";

export const setStateToSuccess = (payload) => ({
  type: RES_SUCCESS,
  payload,
});

const setStateToFetching = () => ({
  type: RES_FETCHING,
});

const setStateToFailed = () => ({
  type: RES_FAILED,
});

export const getResearch = () => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    doGetResearch(dispatch);
  };
};

const doGetResearch = async (dispatch) => {
  try {
    let result = await httpClient.get(server.RESEARCH_URL, {
      headers: authHeader(),
    });
    dispatch(setStateToSuccess(result.data));
  } catch (err) {
    dispatch(setStateToFailed());
  }
};

export const addResearch = (value, history) => {
  return async (dispatch) => {
    await httpClient.post(server.RESEARCH_URL, value, {
      headers: authHeader(),
    });
    history.goBack();
  };
};

export const deleteResearch = (id) => {
  return async (dispatch) => {
    await httpClient.delete(`${server.RESEARCH_URL}/${id}`);
    await doGetResearch(dispatch);
  };
};

export const upload = (id, file, chapter, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("chapter", chapter);
  formData.append("id", id);

  return http.post("path/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const getFileByResearch = (id) => {
  return httpClient.get(`${server.FILE_URL}/${id}`, {
    headers: authHeader(),
  });
};

export const getFilePoint = (id) => {
  return httpClient.get(`${server.POINT_URL}/${id}`, {
    headers: authHeader(),
  });
};

export const doGetFileByResearch = (id) => {
  return httpClient.get(`${server.FILE_PDF}/${id}`, {
    headers: authHeader(),
  });
};

export const doGetFileByResearchAndChapter = (id, chapter) => {
  return httpClient.get(`${server.FILE_CHAPTER}/${id}/${chapter}`, {
    headers: authHeader(),
  });
};

export const deleteFile = (id, fileName) => {
  return httpClient.delete(`${server.DELETE_FILE}/${id}/${fileName}`);
};

export const getUrlPdf = (filename) => {
  return httpClient.get(`${server.URL_PDF}/${filename}`, {
    headers: authHeader(),
  });
};

export const getAllResearch = () => {
  return httpClient.get(server.RES_ALL);
};

export const getAllResearchByStartDate = (startDate) => {
  return httpClient.get(`${server.RES_ALL}?startDate=${startDate}`);
};

export const getAllResearchByAccountId = (id) => {
  return httpClient.get(`${server.RES_ALL}/${id}`, {
    headers: authHeader(),
  });
};

// export const updateWeight = (id,values) => {
//   return httpClient.put(`${server.RESEARCH_WEIGHT}/${id}`);
// };

export const updateWeight = (id,values, history) => {
  return async dispatch => {
    await httpClient.put(`${server.RESEARCH_WEIGHT}/${id}`, values);
  };
};
