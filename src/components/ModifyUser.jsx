import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dashboard from "../assets/dashboardcover.png";
import { useAuthStore } from "../zustand/store";
import loading from "../assets/loading.gif";

const ModifyUser = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [data, setFormData] = useState({});
  const [newData, setNewFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    birthday_year: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/auth/userupdate/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().authToken}`,
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUser(updatedData);
        toast.success("User profile updated successfully");
      } else {
        toast.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Failed to update user profile:", error);
      toast.error("Failed to update user profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col pt-14 gap-5 justify-center dark:bg-[#241229] items-center h-screen">
      <ToastContainer position="bottom-right" />
      <img
        src={dashboard}
        alt=""
        className="absolute left-0 w-full md:h-auto h-[40%] top-0 shadow-xl object-cover object-top md:object-center"
      />

      <h2 className="md:text-2xl text-2xl rounded z-[10] p-3 md:w-[540px] w-[90%] bg-white dark:bg-[#25273D] dark:text-white text-[#D375B9] font-bold text-center ">
        Modify User Information
      </h2>
      <div className="md:w-[540px] w-[90%] z-[11] bg-white dark:bg-[#25273D] dark:shadow-white/20 max-h-fit flex flex-col gap-8 md:px-28 px-9 text-[#697386] dark:text-white rounded-md py-7 shadow-xl justify-center">
        <div className="">
          <label htmlFor="email" className="pl-1 text-[#697386] font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder={data.email}
            className="w-full p-2 border dark:bg-[#404363] dark:border-none rounded shadow-sm"
          />
        </div>
        <div className="">
          <label
            htmlFor="password"
            className="pl-1 text-[#697386] text-base font-bold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder={data.password}
            className="w-full p-2 border dark:bg-[#404363] dark:border-none rounded shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="username" className="pl-1 text-[#697386] font-bold">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            placeholder={data.username}
            className="w-full p-2 border dark:bg-[#404363] dark:border-none rounded shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="pl-1 text-[#697386] font-bold">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            onChange={handleInputChange}
            placeholder={data.phone}
            className="w-full p-2 dark:bg-[#404363] dark:border-none border rounded shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="birthday" className="pl-1 text-[#697386] font-bold">
            Birthday Year
          </label>
          <input
            type="text"
            name="birthday_year"
            onChange={handleInputChange}
            placeholder={data.birthday_year}
            className="w-full p-2 dark:bg-[#404363] dark:border-none border rounded shadow-sm"
          />
        </div>
      </div>
      <button
        className="md:w-[540px] w-[90%] flex justify-center items-center bg-[#D375B9] font-bold text-xl text-white p-2 dark:shadow-white/30 rounded"
        onClick={handleProfileUpdate}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ModifyUser;
