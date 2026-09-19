import { createContext, useCallback, useContext, useState } from "react";

import { Loading } from "../components/Loading";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingCount((count) => count + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount((count) => Math.max(0, count - 1));
  }, []);

  const loading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
