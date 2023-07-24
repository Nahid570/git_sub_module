import { useQuery } from "react-query";
import { getRequest } from "../utils/axiosRequests";


export const useGetRequest = (queryName, url, onSuccess, onError) => {
    return useQuery(
      queryName,
      () => {
        return getRequest(url);
      },
      {
        onSuccess,
        onError,
        enabled: false,
      }
    );
}