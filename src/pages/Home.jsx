import React, { useEffect, useState } from "react";
import dashboard from "../assets/dashboardcover.png";
import { useAuthStore } from "../zustand/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const notes = useAuthStore((state) => state.notes);
  const addNote = useAuthStore((state) => state.addNote);
  const deleteNote = useAuthStore((state) => state.deleteNote);
  const setNotes = useAuthStore((state) => state.setNotes);
  const updateNote = useAuthStore((state) => state.updateNote);
  const clearCompletedNotes = useAuthStore(
    (state) => state.clearCompletedNotes
  );

  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    const response = await fetch(
      "https://notes-server-side-api.onrender.com/api/note/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().authToken}`,
        },
      }
    );
    const notesData = await response.json();
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Fetch notes when the component mounts

  const handleAddNote = async () => {
    if (newNote.trim() === "") return;

    try {
      const response = await fetch(
        "https://notes-server-side-api.onrender.com/api/note/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().authToken}`,
          },
          body: JSON.stringify({ note: newNote }),
        }
      );

      const data = await response.json();
      addNote(data.notes);
      setNewNote("");

      if (response.ok) {
        await fetchNotes(); // Fetch notes again after adding a new note
        toast.success("Note added successfully");
      } else {
        console.error("Failed to add note:", response.statusText);
        toast.error("Failed to add note");
      }
    } catch (error) {
      console.error("An error occurred while adding the note:", error);
      toast.error("An error occurred while adding the note");
    }
  };

  const handleUpdateNote = async (id, is_completed) => {
    if (!id) {
      console.error("Note ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `https://notes-server-side-api.onrender.com/api/note/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().authToken}`,
          },
          body: JSON.stringify({ is_completed: !is_completed }),
        }
      );

      if (response.ok) {
        updateNote(id);
        await fetchNotes();
        toast.success("Note updated successfully");
        // const updatedNote = await response.json();

        // Fetch notes again after updating a note
      } else {
        console.error("Failed to update note:", response.statusText);
        toast.error("Failed to update note");
      }
    } catch (error) {
      console.error("An error occurred while updating the note:", error);
      toast.error("An error occurred while updating the note");
    }
  };

  const handleDeleteNote = async (id) => {
    if (!id) {
      console.error("Note ID is undefined");
      return;
    }
    try {
      const response = await fetch(
        `https://notes-server-side-api.onrender.com/api/note/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().authToken}`,
          },
        }
      );

      if (response.ok) {
        deleteNote(id);
        await fetchNotes(); // Fetch notes again after deleting a note
        toast.success("Note deleted successfully");
      } else {
        console.error("Failed to delete note:", response.statusText);
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error("An error occurred while deleting the note:", error);
      toast.error("An error occurred while deleting the note");
    }
  };

  const handleClearCompleted = async () => {
    try {
      const response = await fetch(
        "https://notes-server-side-api.onrender.com/api/note/clear",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().authToken}`,
          },
        }
      );

      if (response.ok) {
        clearCompletedNotes();
        await fetchNotes(); // Fetch notes again after clearing completed notes
        toast.success("Completed notes cleared successfully");
      } else {
        toast.error("Failed to clear completed notes");
      }
    } catch (error) {
      console.error("An error occurred while clearing completed notes:", error);
      toast.error("An error occurred while clearing completed notes");
    }
  };

  const [filter, setFilter] = useState("All");
  const filteredTodos = notes.filter((todo) => {
    if (filter === "Active") return !todo.is_completed;
    if (filter === "Completed") return todo.is_completed;
    return true; // "All" case
  });

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <div className="flex z-[-9] dark:bg-[#241229]  justify-center items-center h-screen">
        <img
          src={dashboard}
          alt=""
          className="absolute  left-0 w-full md:h-auto h-[40%] top-0 shadow-xl object-cover object-top md:object-center"
        />
        <div className="flex justify-center z-[10] flex-col items-center w-full h-full ">
          <div className="flex  items-center relative  mt-8 md:w-full w-[90%] max-w-md">
            <input
              type="text"
              placeholder="Create a new todo..."
              name="note"
              className="w-full p-3 rounded-md border dark:bg-[#25273D] dark:text-white border-gray-300 dark:border-gray-800 focus:outline-none focus:border-pink-500 shadow-md"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddNote();
              }}
            />
            <button className="absolute right-0 mr-3" onClick={handleAddNote}>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              >
                <title>plus-circle</title>
                <desc>Created with Sketch Beta.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="#545454"
                  // fill-rule="evenodd"
                  sketch:type="MSPage"
                >
                  <g
                    id="Icon-Set"
                    sketch:type="MSLayerGroup"
                    transform="translate(-464.000000, -1087.000000)"
                    // fill="#000000"
                  >
                    <path
                      d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
                      id="plus-circle"
                      sketch:type="MSShapeGroup"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <div className="mt-6 md:w-full w-[90%] max-w-md dark:bg-[#25273D] dark:text-white bg-white rounded-md shadow-lg p-4">
            <ul className="space-y-3 max-h-[400px] overflow-scroll">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-[#393A4B]"
                >
                  {/* Checkbox button */}
                  <button
                    // onClick={() => handleToggleComplete(index)}
                    // name="is_completed"
                    onClick={() => handleUpdateNote(todo.id, todo.is_completed)}
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
                    {todo.content}
                  </span>

                  {/* Delete Button */}
                  <button
                    // onClick={() => handleDeleteTodo(index)}
                    className="text-gray-400 hover:text-red-500 focus:outline-none"
                    onClick={() => handleDeleteNote(todo.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>{filteredTodos.length} items left</span>
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
              <button
                className="focus:outline-none"
                onClick={handleClearCompleted}
              >
                Clear Completed
              </button>
            </div>
          </div>
          <div className="md:hidden bg-white dark:bg-[#25273D]  shadow-xl w-[90%] h-[48px] text-gray-500 mt-4 justify-center flex space-x-4">
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
