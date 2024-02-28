import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY, RAPID_API_HOST } from "@env";

const rapidApiKey = RAPID_API_KEY;
const rapidApiHost = RAPID_API_HOST;

const usePopularJobFetch = (endpoint, userPosition) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const options = {
          headers: {
            "X-RapidAPI-Key": rapidApiKey,
            "X-RapidAPI-Host": rapidApiHost,
          },
          method: "GET",
          url: `https://jsearch.p.rapidapi.com/${endpoint}`,
          params: {
            query: userPosition,
            page: 1,
            num_pages: 1,
          },
        };
        const response = await axios.request(options);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        alert("Warning: Cannot Fetch Popular Job Data");
      } finally {
        setIsLoading(false);
      }
    };

    if (endpoint && userPosition) {
      fetchData();
    }
  }, [endpoint, userPosition]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  };

  return { data, isLoading, error, refetch };
};

export default usePopularJobFetch;
