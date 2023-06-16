import { createContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const toast = useToast();

  const updateNotes = (note) => {
    setNotes([...notes, note]);
    toast({
      title: "Note added",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };
  return (
    <NoteContext.Provider value={{ updateNotes, notes }}>
      {children}
    </NoteContext.Provider>
  );
};
