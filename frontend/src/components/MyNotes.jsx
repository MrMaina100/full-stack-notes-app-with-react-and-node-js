import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { NoteContext } from "../context/NoteContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const MyNotes = () => {
  const toast = useToast();

  const { notes, setNotes, removeNote } = useContext(NoteContext);

  const { getAccessTokenSilently, user } = useAuth0();

  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    setToken(token);
    console.log(token);
  };

  if (user) {
    getToken();
  }

  const getNotes = async () => {
    setIsLoading(true);
    const res = await fetch("https://notes-api-kiprono.onrender.com/notes/", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);
    const data = await res.json();
    setNotes(data);
  };

  const deletNote = async (id) => {
    const res = await fetch(
      `https://notes-api-kiprono.onrender.com/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    console.log(data);
    removeNote(id);

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
  console.dir(notes);

  const formatDate = (date) => {
    const today = new Date(date).toLocaleDateString();
    return today;
  };
  return (
    <div className="p-6">
      <p className="text-center font-bold mb-6">My Notes</p>
      <div className="max-w-7xl m-auto p-6 bg-[#dee2d5] rounded-lg">
        {!user ? (
          "Please Log in to view your notes"
        ) : isLoading ? (
          <Spinner />
        ) : !notes.length ? (
          "No notes to show, please add a note"
        ) : (
          notes
            .sort((a, b) => {
              
                if(new Date(a.createdAt).toLocaleString()  > new Date(b.createdAt).toLocaleString()){

                  return -1

                }else{
                  return 1
                }
             
                
            })
            .map((note, index) => {
              return (
                <div
                  key={note._id}
                  className="flex items-center justify-between bg-white p-2 rounded mt-4"
                >
                  <div className="">
                    <p className="font-bold text-xl">{note.title}</p>
                    <p>{note.note}</p>
                    <p>{formatDate(note.createdAt)}</p>
                  </div>
                  <div
                    onClick={() => deletNote(note._id)}
                    className="cursor-pointer"
                  >
                    <FaTrashAlt />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default MyNotes;
