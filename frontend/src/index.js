import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import "./App.css";

const router = createBrowserRouter(
  [
    {
      path: "*",
      element: (
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          }}
          cacheLocation="localstorage"
          useRefreshTokens={true}
          skipRedirectCallback={window.location.pathname === "/callback"}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </Auth0Provider>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
