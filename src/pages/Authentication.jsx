import React, { useState } from "react";
import background from "../assets/bigcover.png";
import smallBg from "../assets/insidecover.png";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <div className="relative w-full  h-screen flex py-4  justify-center items-center">
        <img
          src={background}
          alt="background"
          className="absolute top-0 left-0 w-full h-full object-cover object-top md:object-center "
        />
        <div className="md:w-[971px] md:h-[600px] w-[90%] h-full justify-center items-center flex md:flex-row flex-col">
          <div className="relative md:w-1/2 w-full md:h-full h-[277px] flex justify-center items-center">
            <img
              src={smallBg}
              alt=""
              className="absolute top-0 left-0 w-full md:h-full h-full  object-cover object-top md:object-center "
            />
            <div className="relative backdrop-blur bg-white/20 flex flex-col gap-5 md:w-[400px] w-[80%] md:h-[450px]  h-[80%]  justify-center items-center ">
              <svg
                width="70"
                height="70"
                viewBox="0 0 32 30"
                fill="#FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-[70px] w-[40px] h-[40px] md:h-[70px] "
              >
                <path
                  d="M29.0909 4.77L12.4945 21.9L6.32727 15.54L8.37818 13.425L12.4945 17.67L27.04 2.67L29.0909 4.77ZM14.5455 27C8.13091 27 2.90909 21.615 2.90909 15C2.90909 8.385 8.13091 3 14.5455 3C16.8291 3 18.9673 3.69 20.7709 4.875L22.88 2.7C20.5091 1.005 17.6436 0 14.5455 0C6.51636 0 0 6.72 0 15C0 23.28 6.51636 30 14.5455 30C17.0618 30 19.4327 29.34 21.4982 28.17L19.3164 25.92C17.8618 26.61 16.2473 27 14.5455 27ZM24.7273 19.5H20.3636V22.5H24.7273V27H27.6364V22.5H32V19.5H27.6364V15H24.7273V19.5Z"
                  fill="#FFFFFF"
                />
              </svg>

              <p className="md:text-6xl text-5xl text-white ">Your Notes</p>
            </div>
          </div>
          <div className="relative bg-white md:w-1/2 w-full md:h-full h-[500px]">
            {isLogin ? (
              <Login onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <Signup onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
