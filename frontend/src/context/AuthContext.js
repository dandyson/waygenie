import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
          setError(null);
        }
      } catch (error) {
        setError(error.message || "Failed to get authentication token");
        setToken(null);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
