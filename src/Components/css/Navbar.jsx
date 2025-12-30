import React from "react";

const Navbar = () => {
  return (
    <div className="bg-blue-100 p-2 flex justify-between">
      <h1> Bharaghor</h1>
      <div className="flex gap-5">
        <a className="border-2 p-2" href="/login">
          Login
        </a>
        <a className="border-2 p-2" href="/register">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Navbar;
