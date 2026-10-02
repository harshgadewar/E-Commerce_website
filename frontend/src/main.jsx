// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import "./index.css";

// import { LoadingProvider } from "./context/LoadingContext.jsx";
// import { AxiosInterceptor } from "./context/AxiosInterceptor.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <LoadingProvider>
//       <AxiosInterceptor />
//       <App />
//     </LoadingProvider>
//   </BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { LoadingProvider } from "./context/LoadingContext.jsx";
import { AxiosInterceptor } from "./context/AxiosInterceptor.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <AxiosInterceptor />
        <App />
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
);