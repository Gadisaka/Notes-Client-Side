import React, { useState } from "react";

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Logging in with:", { email, password });

      // Placeholder for the actual login API request
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const result = await response.json();
      // console.log("Server response:", result);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center p-5 md:h-[600px] h-full shadow-2xl items-center flex-col ">
      <div className="w-full h-full flex flex-col gap-5 justify-center">
        <h2 className="text-5xl text-[#D375B9] font-bold text-center ">
          Login
        </h2>
        <div className="">
          <label htmlFor="email" className="pl-1 text-[#697386] font-bold">
            Email
          </label>
          <input
            type="email"
            //   placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="pl-1 text-[#697386] text-base font-bold "
          >
            Password
          </label>
          <input
            type="password"
            //   placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#D375B9] font-bold text-2xl text-white p-2 rounded mt-10"
        >
          Login
        </button>
        <p className="text-center text-gray-600 text-xl">
          Don't have an account?{" "}
          <span
            onClick={onSwitchToSignup}
            className="text-[#D375B9] cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
