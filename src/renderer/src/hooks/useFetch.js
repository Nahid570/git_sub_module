import { useEffect, useState } from "react"
import { getRequest } from "../utils/axiosRequests";

const useFetch = ()=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        getRequest(url)
    })

}