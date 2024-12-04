import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";

const NavBar = ({ resetStep }) => {
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    const cloudFrontUrl = process.env.REACT_APP_CLOUDFRONT_URL;

    logout({
      logoutParams: {
        returnTo: cloudFrontUrl,
      },
    });
  };

  return (
    <nav className="w-full flex items-center justify-between p-4 bg-nav-blue">
      <button onClick={resetStep}>
        <span className="text-white font-bold text-xl">WayGenie</span>
      </button>

      {user && <span className="text-white hidden md:block">{user.email}</span>}
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-2 px-4 rounded transition-colors"
      >
        Log Out
      </button>
    </nav>
  );
};

NavBar.propTypes = {
  resetStep: PropTypes.func.isRequired,
};

export default NavBar;
