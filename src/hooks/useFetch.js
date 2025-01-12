import { useState, useEffect } from 'react';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const options = {
        method: method, // Method (GET, POST, PUT, DELETE)
        credentials: 'include', // Include credentials (cookies)
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      // If it's a POST or PUT request, include the body
      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }

      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          setError("Failed to fetch");
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, loading };
};

export default useFetch;
