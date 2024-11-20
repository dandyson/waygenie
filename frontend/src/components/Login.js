import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div
      data-testid="login-component"
      className="min-h-screen flex items-center justify-center p-8 bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)]"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <div className="mb-6 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
          </svg>
        </div>
        <div className="mb-4 text-center">
          <h4 className="block text-gray-700 font-extrabold mb-2 text-3xl">
            Welcome to WayGenie!
          </h4>
          <p>The AI Travel Planner</p>
          <p className="mt-4 text-gray-600">
            Please login to start planning your trip
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6">
          <button
            onClick={() => loginWithRedirect()}
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <span className="me-2">Log In</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
