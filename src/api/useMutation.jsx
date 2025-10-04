import { useState } from "react";
import { useApi } from "./apiContext";

const useMutation = (method, resource, tagsToInvalidate) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { request, invalidateTags } = useApi();

  const mutate = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource, {
        method,
        body: JSON.stringify(body),
      });
      setData(result);
      invalidateTags(tagsToInvalidate);
    } catch (e) {
      setError(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
};

export default useMutation;
