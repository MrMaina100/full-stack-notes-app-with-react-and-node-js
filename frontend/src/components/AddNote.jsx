import React, { useContext, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { NoteContext } from "../context/NoteContext";
import { useAuth0 } from "@auth0/auth0-react";

const AddNote = () => {
  const toast = useToast();

  const { updateNotes } = useContext(NoteContext);

  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  };

  const addNote = async () => {
    const token = await getToken();

    const res = await fetch("https://notes-api-kiprono.onrender.com/notes/", {
      method: "POST",
      body: JSON.stringify({ title, note }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const newNote = await res.json();
    console.log(newNote)
    updateNotes(newNote)
    toast({
      title: `${newNote.title} added`,
      status: "success",
      description: "Refresh page to view it",
      isClosable: true,
      position: "top",
    });
    setTitle("");
    setNote("");
  };
  return (
    <div className="p-6">
      <p className="text-center font-bold mt-4">Add Note</p>
      <div className="max-w-7xl m-auto p-6 flex  justify-center border bg-[#dee2d5] rounded-lg mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNote();
          }}
          className="flex flex-col "
        >
          <div>
            <label htmlFor="">Title</label>
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className=" border border-gray-400 ml-8 p-2 rounded-lg text-sm"
            />
          </div>
          <div className="mt-8">
            <label htmlFor="">Note</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              type="text"
              className=" border border-gray-400 ml-8 p-2 rounded-lg h-32 text-sm sm:w-96"
            />
          </div>
          <Button type="submit" colorScheme="facebook" className="mt-4">
            Add Note
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
