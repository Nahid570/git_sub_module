import { useMutation } from "react-query";
import { deleteRequest } from "../utils/axiosRequests";

export const useDeleteRequest = (url, onSuccess, onError) => {
  return useMutation(
    () => {
      return deleteRequest(url);
    },
    {
      onSuccess,
      onError,
    }
  );
};
