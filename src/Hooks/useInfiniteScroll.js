import { useState, useCallback, useRef } from 'react';

const useInfiniteScroll = (apiEndPoint, initialData, initialNextPageToken) => {
  const [data, setData] = useState(initialData || []);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(initialNextPageToken);

  const fetchMoreData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiEndPoint}&pageToken=${nextPageToken}`);
      const json = await response.json();
      setData((prevState) => [...prevState, ...json.items]); // Adjusted to access the correct data structure
      setNextPageToken(json.nextPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiEndPoint, nextPageToken]);

  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreData();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, fetchMoreData]);

  return { data, lastElementRef, loading };
};

export default useInfiniteScroll;
