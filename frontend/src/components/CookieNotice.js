import React from "react";
import { Link } from "react-router-dom";

const CookieNotice = () => {
  return (
    <div className="p-2 text-center bg-black">
      <div className="text-sm text-white">
        This site uses essential cookies for authentication. By using this app,
        you agree to our use of cookies.{" "}
        <Link to="/privacy" className="underline hover:text-gray-200">
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default CookieNotice;
