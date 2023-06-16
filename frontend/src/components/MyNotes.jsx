import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { NoteContext } from "../context/NoteContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";

const MyNotes = () => {
  const toast = useToast();

  const [notes, setNotes] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();

  const [token, setToken] = useState("");

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    setToken(token);
  };

  if (user) {
    getToken();
  }

  const getNotes = async () => {
    const res = await fetch("https://notes-api-kiprono.onrender.com/notes/", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setNotes(data);
  };

  const deletNote = async (id) => {
    const res = await fetch(`https://notes-api-kiprono.onrender.com/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    toast({
      title: `Note Deleted`,
      status: "success",
      description: "Deleted successfully",
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [token]);

  return (
    <div className="p-6">
      <p className="text-center font-bold mb-6">My Notes</p>
      <div className="max-w-7xl m-auto p-6 bg-[#dee2d5] rounded-lg">
        {notes.map((note, index) => {
          return (
            <div
              key={note._id}
              className="flex items-center justify-between bg-white p-2 rounded mt-4"
            >
              <div className="">
                <p className="font-bold text-xl">{note.title}</p>
                <p>{note.note}</p>
              </div>
              <div
                onClick={() => deletNote(note._id)}
                className="cursor-pointer"
              >
                <FaTrashAlt />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyNotes;
