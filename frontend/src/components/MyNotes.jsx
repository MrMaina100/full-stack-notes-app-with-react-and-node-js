import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const MyNotes = () => {
  const toast = useToast();

  const [fetchNotes, setFetchNotes] = useState(false);

  const { getAccessTokenSilently, user } = useAuth0();

  const [token, setToken] = useState("");

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    setToken(token);
    console.log(token);
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
    return data;
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

    toast({
      title: `Note Deleted`,
      status: "success",
      description: "Deleted successfully",
      isClosable: true,
      position: "top",
    });
  };

  const formatDate = (date) => {
    const today = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
    return today;
  };

  const {
    data: notes,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery(["notes"], getNotes, { enabled: fetchNotes });

  useEffect(() => {
    if (user) {
      setFetchNotes(true);
    }
  }, [user]);

  return (
    <div className="p-6">
      {isError && <div>{error.message}</div>}
      <p className="text-center font-bold mb-6">My Notes</p>
      <div className="max-w-7xl m-auto p-6 bg-[#dee2d5] rounded-lg">
        {!user ? (
          "Please Log in to view your notes"
        ) : isLoading ? (
          <Spinner />
        ) : !notes?.length ? (
          "No notes to show, please add a note"
        ) : (
          notes
            ?.sort((a, b) => {
              if (
                new Date(a.createdAt).toLocaleString() >
                new Date(b.createdAt).toLocaleString()
              ) {
                return -1;
              } else {
                return 1;
              }
            })
            .map((note) => {
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
