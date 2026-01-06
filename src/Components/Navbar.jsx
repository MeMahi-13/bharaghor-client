import { use,  } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { userInfo, logOut } = use(AuthContext);
  console.log("Navbar sees user:", userInfo); 

  return (
    <nav>
      {userInfo ? (
        <>
          <span>{userInfo.displayName || "User"}</span>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <span>Login / Register</span>
      )}
    </nav>
  );
};

export default Navbar;
