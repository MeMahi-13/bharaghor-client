import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
        const {_id, name, email} = useLoaderData();


  const handleUpdateUser = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedUser = Object.fromEntries(formData.entries());
    console.log(updatedUser)

    // send user to the db
    fetch(`https://yessghor-server.vercel.app//users/${_id}`,
        {
            method:'PUT',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(updatedUser)
        }
    )
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })

  };
  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" defaultValue={name} placeholder="Name" />
        </div>
        <div>
          <label>Email:  </label>
          <input type="email" name="email" defaultValue={email} placeholder="Email" />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
