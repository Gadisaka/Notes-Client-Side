import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    birthday_year: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
    } else {
      setStep(2);
    }
  };

  const handleCompleteSignup = async () => {
    setIsLoading(true);
    try {
      const signupData = {
        ...formData,
        phone: Number(formData.phone),
        birthday_year: Number(formData.birthday_year),
      };

      const response = await fetch(
        "https://notes-server-side-api.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message || "Signup successful!");
        setTimeout(() => {
          onSwitchToLogin();
          navigate("/auth");
        }, 2000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="flex justify-center p-5 md:h-[600px] h-full shadow-2xl items-center flex-col">
        {step === 1 ? (
          <div className="w-full h-full flex flex-col gap-5 justify-center">
            <h2 className="md:text-5xl text-4xl text-[#D375B9] font-bold text-center">
              Signup
            </h2>
            <div>
              <label htmlFor="email" className="pl-1 text-[#697386] font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border md:mt-4 rounded shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="pl-1 text-[#697386] text-base font-bold"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-[#697386] pl-1 font-bold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-[#D375B9] font-bold text-2xl text-white p-2 rounded mt-10"
            >
              Next →
            </button>
            <p className="text-center text-xl text-gray-600">
              Already have an account?
              <br />
              <span
                onClick={onSwitchToLogin}
                className="text-[#D375B9] cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-5 justify-center">
            <h2 className="md:text-5xl text-4xl text-[#D375B9] font-bold text-center">
              Complete Signup
            </h2>
            <div>
              <label
                htmlFor="username"
                className="pl-1 text-[#697386] font-bold"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="pl-1 text-[#697386] font-bold">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="birthday_year"
                className="pl-1 text-[#697386] font-bold"
              >
                Birthday Year
              </label>
              <input
                type="text"
                name="birthday_year"
                required
                value={formData.birthday_year}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <button
              onClick={handleCompleteSignup}
              className="w-full bg-[#D375B9] font-bold text-2xl text-white p-2 rounded mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Complete Signup →"}
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-[#7C8495] font-bold text-2xl text-[#FFFFFF] p-2 rounded mt-2"
            >
              Back ←
            </button>
            <p className="text-center text-xl text-gray-600">
              Already have an account?
              <span
                onClick={onSwitchToLogin}
                className="text-[#D375B9] cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
