import {
  RES_FAILED,
  RES_FETCHING,
  RES_SUCCESS,
} from "../Constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RES_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case RES_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case RES_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };

    default:
      return state;
  }
};
