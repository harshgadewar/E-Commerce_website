import { useEffect } from "react";
import { useLoading } from "./LoadingContext";
import { api } from "../api/axios";

export function AxiosInterceptor() {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        startLoading();
        return config;
      },
      (error) => {
        stopLoading();
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        stopLoading();
        return response;
      },

      async (error) => {
        const originalRequest = error.config;

        stopLoading();

        // Access token expired/missing
        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/useraction/refresh")
        ) {
          originalRequest._retry = true;

          try {
            // Get a new access token using refresh token
            await api.get("/useraction/refresh");

            // Retry the original request
            return api(originalRequest);
          } catch (refreshError) {
            console.log(
              "Refresh failed status:",
              refreshError.response?.status
            );

            console.log(
              "Refresh failed data:",
              refreshError.response?.data
            );

            console.log(
              "Refresh failed URL:",
              refreshError.config?.url
            );

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [startLoading, stopLoading]);

  return null;
}