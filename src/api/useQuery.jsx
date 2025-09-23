import { useEffect, useState } from "react";
import { useApi } from "./apiContext";

const useQuery = (resource, tag) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { request, provideTag } = useApi();

  const query = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource);
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tag) provideTag(tag, query);
    query();
  }, []);

  return { query, data, loading, error };
};

export default useQuery;
