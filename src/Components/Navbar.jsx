
import { AuthContext } from "../context/AuthContext";
import UseAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = UseAuth;
  console.log("Navbar sees user:", user);

  return (
    <nav>
      {user ? (
        <>
          <span>{user.displayName || "User"}</span>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <span>Login / Register</span>
      )}
    </nav>
  );
};

export default Navbar;
