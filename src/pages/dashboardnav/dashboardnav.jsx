import { FaPlus } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import "./dashboardnav.css"
import { useLoaderData } from "react-router";
function dashboardnav() {


    return (

        <header className="navbar">
      
      {/* LEFT SIDE */}
      {/* <div className="navbar-left">
        <input
          type="text"
          placeholder="Search..."
          className="navbar-search"
        />
      </div> */}

      {/* RIGHT SIDE */}
      {/* <div className="navbar-right">
        <div className="relative w-4 h-4">
  <button className="icon-btn relative">
    <IoNotificationsOutline size={22} />
  </button> */}

  {/* Red dot */}
  {/* <span className="absolute bottom-2 left-4.5 h-2.5 w-2.5 rounded-full bg-red-600"></span>
</div> */}


      {/* </div> */}

    </header>
    );
};

export default dashboardnav;
