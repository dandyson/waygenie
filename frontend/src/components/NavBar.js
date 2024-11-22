import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    const cloudFrontUrl =
      process.env.REACT_APP_CLOUDFRONT_URL ||
      "https://d1tl42qtzfxokv.cloudfront.net";
    logout({
      returnTo: cloudFrontUrl,
    });
  };

  return (
    <nav className="fixed top-0 right-0 p-4 flex items-center gap-4">
      {user && (
        <>
          <span className="text-white">{user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-2 px-4 rounded transition-colors"
          >
            Log Out
          </button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
