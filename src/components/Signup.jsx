import React, { useState } from "react";

const Signup = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    birthday: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
    } else {
      setError("");
      setStep(2);
    }
  };

  const handleCompleteSignup = async () => {
    try {
      console.log("Submitting signup data:", formData);

      // Example of what a request might look like:
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const result = await response.json();
      // console.log("Server response:", result);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      <div className="flex justify-center p-5 md:h-[600px] h-full shadow-2xl  items-center flex-col ">
        {step === 1 ? (
          <div className="w-full h-full flex flex-col gap-5 justify-center">
            <h2 className="md:text-5xl text-4xl text-[#D375B9] font-bold text-center ">
              Signup
            </h2>
            <div className="">
              <label htmlFor="email" className="pl-1 text-[#697386] font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                // placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border md:mt-4 rounded shadow-sm"
              />
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="pl-1 text-[#697386] text-base font-bold "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                // placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <div className="">
              <label
                htmlFor="confirmPassword"
                className="text-[#697386] pl-1 font-bold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                // placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleNext}
              className="w-full bg-[#D375B9] font-bold text-2xl text-white p-2 rounded mt-10"
            >
              Complete Signup →
            </button>
            <p className="text-center text-xl text-gray-600 ">
              Already have an account!
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
            <h2 className="md:text-5xl text-4xl text-[#D375B9] font-bold text-center ">
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
                // placeholder="Username"
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
                // placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="birthday"
                className="pl-1 text-[#697386] font-bold"
              >
                Birthday Year
              </label>
              <input
                type="date"
                name="birthday"
                // placeholder="Birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="w-full p-2 md:mt-4 border rounded shadow-sm"
              />
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-[#D375B9] font-bold text-2xl text-white p-2 rounded mt-10"
            >
              Complete Signup →
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-[#7C8495] font-bold text-2xl text-[#FFFFFF] p-2 rounded mt-2"
            >
              Back &#8592;
            </button>
            <p className="text-center text-xl text-gray-600 ">
              Already have an account!
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
