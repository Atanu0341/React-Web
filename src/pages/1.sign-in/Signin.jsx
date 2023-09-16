import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import appleIcon from "../../assets/appleIcon.svg";

const Signin = () => {
  const navigate = useNavigate(); // Get the navigate function from React Router
  const [user, setUser] = useState({});

  useEffect(() => {
    // Load the Google Identity Services library
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      // Clean up the script element
      document.body.removeChild(script);
    };
  }, []);

  function initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id:
        "673900277729-erfe3bg0n986s4bv19k0u2krtpk4rk7d.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      {
        size: "small",
      }
    );
  }

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    // After successful authentication, navigate to the dashboard
    navigate("/dashboard", { state: { user: userObject } });
  }

  return (
    <div className="w-screen h-screen flex">
      {/* left */}
      <div className="bg-black h-screen w-[38%] flex justify-center items-center lg:w-1/2">
        <h1 className="text-white text-4xl lg:text-7xl">Target.</h1>
      </div>

      {/* right */}
      <div className="bg-[#F5F5F5] flex justify-center items-center w-[62%]">
        <div className="flex flex-col w-[85%] p-3 lg:w-[55%]">
          <div className="text-4xl font-bold">Sign In</div>
          <div className="mt-[6px]">Sign in to your account</div>

          <div className="flex flex-col gap-3 mt-[12px] lg:flex-row lg:justify-between lg:mt-5">
            <div
              className="bg-white text-[#858585] text-sm rounded-md flex items-center justify-center w-full lg:mr-3 lg:p-1"
              id="googleSignInButton"
            ></div>

            <button className="bg-white text-[#858585] text-sm rounded-md flex items-center justify-center w-full lg:p-1">
              <img
                src={appleIcon}
                alt="Apple Icon"
                className="w-3 h-5 mr-2 ml-[10px]"
              />
              <span className="lg:text-[12px]">Sign in with Apple</span>
            </button>
          </div>

          <div className="bg-white mt-5 p-3 flex flex-col rounded-2xl h-[55%] gap-[17px] lg:p-5">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              className="bg-[#F5F5F5] rounded-md w-full lg:p-2"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="bg-[#F5F5F5] rounded-md w-full lg:p-2"
            />

            <a href="" className="text-[#346BD4] text-sm">
              Forgot Password?
            </a>

            <button className="bg-black text-white text-center rounded-md w-full lg:p-2 lg:text-lg font-bold">
              Sign In
            </button>
          </div>

          <p className="mt-[10px] text-[#858585]">
            Don’t have an account?{" "}
            <a href="" className="text-[#346BD4]">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
