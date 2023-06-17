import React from "react";
import MenuBar from "./MenuBar";

const Navbar = () => {
  return (
    <div className="bg-[#051B39] ">
      <div className="flex justify-between max-w-7xl m-auto p-6 items-center">
        <div>
          <p className="text-white">My Notes</p>
        </div>
        <div className="flex">
          <div >
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
