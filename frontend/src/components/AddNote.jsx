import { useContext, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { NoteContext } from "../context/NoteContext";
import { useAuth0 } from "@auth0/auth0-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    if (!res.ok) {
      throw Error(newNote.error);
    }

    console.log(newNote);
    updateNotes(newNote);
    toast({
      title: `${newNote.title} added`,
      status: "success",
      isClosable: true,
      position: "top",
    });
    setTitle("");
    setNote("");
    return newNote;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation(addNote, {
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (old) => {
        return [...old, data];
      });
    },
  });

  return (
    <div className="p-6">
      <p className="text-center font-bold ">Add Note</p>
      <div className="max-w-7xl m-auto p-4 flex  justify-center border bg-[#dee2d5] rounded-lg mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ title, note });
          }}
          className="flex flex-col "
        >
          <div>
            <label htmlFor="">Title </label>
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
              className=" border border-gray-400 ml-8 p-2 rounded-lg text-sm sm:w-96"
            />
          </div>
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="facebook"
            className="mt-4"
          >
            Add Note
          </Button>
          {isError && <div className="text-red-800">{error.message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddNote;
