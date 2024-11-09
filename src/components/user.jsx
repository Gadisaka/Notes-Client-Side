import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToggleStore, useAuthStore } from "../zustand/store";

const User = () => {
  const toggleButton = useToggleStore((state) => state.toggleButton);
  const toggle = useToggleStore((state) => state.toggle);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleNavigate = () => {
    toggle();
    navigate("/modify");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // const user = {
  //   id: 1,
  //   email: "mohammed@example.com",
  //   username: "mohammed",
  //   phone: 123456789,
  //   birthday_year: 2002,
  // };

  const fetchUser = async () => {
    const response = await fetch(`/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthStore.getState().authToken}`,
      },
    });
    const fetchedData = await response.json();
    setUser(fetchedData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (toggleButton === false) return null;

  return (
    <div className="md:w-64 md:h-60 w-full h-full bg-black/70 md:bg-white md:dark:bg-[#241229] dark:shadow-white/20 dark:shadow z-[10000] md:rounded-2xl flex shadow-xl flex-col md:justify-around justify-center gap-5 items-center top-0 right-0 absolute md:mt-[90px] mt-[55px] md:mr-[40px] ">
      <h1 className="text-2xl text-[#D375B9] font-semibold">
        Hi {user.username}{" "}
      </h1>
      <div className="flex flex-col text-white text-xl gap-3 font-semibold justify-between w-full items-center">
        <button
          className="bg-[#7C8495] md:h-9 h-10 w-[90%] rounded-lg "
          onClick={handleNavigate}
        >
          {" "}
          Modify User Info{" "}
        </button>
        <button
          className="bg-[#D375B9] md:h-9 h-10 w-[90%] rounded-lg "
          onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default User;
