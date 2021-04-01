export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// RESEARCH Page
export const RES_FETCHING = "RESEARCH_FETCHING";
export const RES_SUCCESS = "RESEARCH_SUCCESS";
export const RES_FAILED = "RESEARCH_FAILED";
export const RES_CLEAR = "RESEARCH_CLEAR";

// RESEARCH Edit Page
export const RES_EDIT_FETCHING = "RESEARCH_EDIT_FETCHING";
export const RES_EDIT_SUCCESS = "RESEARCH_EDIT_SUCCESS";
export const RES_EDIT_FAILED = "RESEARCH_EDIT_FAILED";
export const RES_EDIT_INITIALED = "RESEARCH_EDIT_INITIALED";

export const apiUrl = "http://localhost:9001/api/";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const LOGIN_STATUS = "LOGIN_STATUS" ;

export const server = {
  LOGIN_URL: `auth/signing`,
  REGISTER_URL: `auth/signup`,
  RESEARCH_URL: `path/research`,
  ACCOUBT_URL: `auth/account`,
  FILE_URL: `path/file`,
  POINT_URL: `path/file/pr`,
  DOWNLOAD_URL: `path/download`,
  LOGIN_PASSED: `yes`,
  FILE_PDF: `path/file/pdf`,
  FILE_CHAPTER: `path/file/id`,
  DELETE_FILE: `path/file/delete`,
  URL_PDF: `path/url`,
  RES_ALL: `path/research/all`,
  RESEARCH_WEIGHT: `path/research/weight`,


};



// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
