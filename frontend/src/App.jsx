import React from "react";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import MyNotes from "./components/MyNotes";

const App = () => {
  return (
    <div>
      <Navbar />
      <AddNote />
      <MyNotes/>
    </div>
  );
};

export default App;
