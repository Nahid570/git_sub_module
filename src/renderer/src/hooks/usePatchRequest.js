import { useMutation } from "react-query";
import { patchRequest } from "../utils/axiosRequests";

export const usePatchRequest = (url, data, onSuccess, onError) => {
  return useMutation(
    () => {
      return patchRequest(url, data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
