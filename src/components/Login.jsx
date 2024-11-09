import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/store";

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const setNotes = useAuthStore((state) => state.setNotes);

  const [isLoding, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        login(data.token);
        const notesResponse = await fetch("/api/note/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        });
        const notesData = await notesResponse.json();
        setNotes(notesData);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
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
            name="email"
            required
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
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#D375B9] font-bold text-2xl text-white p-2 rounded mt-10"
          disabled={isLoding}
        >
          {isLoding ? "Loading..." : "Login"}
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
