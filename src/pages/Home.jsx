import React, { useState } from "react";
import Navbar from "../components/Navbar";
import dashboard from "../assets/dashboardcover.png";
import { data } from "../../data";

const Home = () => {
  // Handle Enter key in the input field
  //   const handleKeyPress = (event) => {
  //     if (event.key === "Enter") {
  //       handleAddTodo();
  //     }
  //   };
  const [filter, setFilter] = useState("All");
  const filteredTodos = data.filter((todo) => {
    if (filter === "Active") return !todo.is_completed;
    if (filter === "Completed") return todo.is_completed;
    return true; // "All" case
  });
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <img
          src={dashboard}
          alt=""
          className="absolute z-[-888] left-0 w-full md:h-auto h-[40%] top-0 shadow-xl object-cover object-top md:object-center"
        />
        <div className=" flex justify-center flex-col items-center w-full h-full ">
          <div className="mt-8 md:w-full w-[90%] max-w-md">
            <input
              type="text"
              placeholder="Create a new todo..."
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500 shadow-md"
              //   value={newTodo}
              //   onChange={(e) => setNewTodo(e.target.value)}
              //   onKeyPress={handleKeyPress}
            />
          </div>
          <div className="mt-6 md:w-full w-[90%] max-w-md bg-white rounded-md shadow-lg p-4">
            <ul className="space-y-3">
              {filteredTodos.map((todo, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 border-b border-gray-200"
                >
                  {/* Checkbox button */}
                  <button
                    // onClick={() => handleToggleComplete(index)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      todo.is_completed
                        ? "bg-pink-500 border-pink-500"
                        : "border-gray-400"
                    } flex items-center justify-center focus:outline-none`}
                  >
                    {todo.is_completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Todo Text */}
                  <span
                    className={`flex-1 ml-3 ${
                      todo.is_completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.note}
                  </span>

                  {/* Delete Button */}
                  <button
                    // onClick={() => handleDeleteTodo(index)}
                    className="text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>{data.length} items left</span>
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => setFilter("All")}
                  className={`focus:outline-none ${
                    filter === "All" ? "text-pink-500" : ""
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("Active")}
                  className={`focus:outline-none ${
                    filter === "Active" ? "text-pink-500" : ""
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("Completed")}
                  className={`focus:outline-none ${
                    filter === "Completed" ? "text-pink-500" : ""
                  }`}
                >
                  Completed
                </button>
              </div>
              <button className="focus:outline-none">Clear Completed</button>
            </div>
          </div>
          <div className="md:hidden bg-white shadow-xl w-[90%] h-[48px] text-gray-500 mt-4 justify-center flex space-x-4">
            <button
              onClick={() => setFilter("All")}
              className={`focus:outline-none ${
                filter === "All" ? "text-pink-500" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Active")}
              className={`focus:outline-none ${
                filter === "Active" ? "text-pink-500" : ""
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("Completed")}
              className={`focus:outline-none ${
                filter === "Completed" ? "text-pink-500" : ""
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
