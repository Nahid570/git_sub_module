import { useMutation } from "react-query";
import { postRequest } from "../utils/axiosRequests";

export const usePostRequest = (url, data, onSuccess, onError, optoins = {}) => {
  return useMutation(
    () => {
      return postRequest(url, data, optoins);
    },
    {
      onSuccess,
      onError,
    }
  );
};
