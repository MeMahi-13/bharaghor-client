import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const { name, email, createdAt } = useLoaderData();
  return (
    <div className="p-5">
      <h1>name:{name}</h1>
      <h1>email:{email}</h1>
      <h1>Joined On: {createdAt}</h1>
    </div>
  );
};

export default UserDetails;
