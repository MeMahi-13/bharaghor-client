
import Nidverification from "../../Components/admin/Nidverification";
import Pendinguser from "../../Components/admin/Pendinguser";
const AllUsers = () => {
    
    return (
        <div>
            {/* NID verification */}
              <Nidverification/>
              {/* pending user */}
              <Pendinguser/>
        </div>
         
    );
};

export default AllUsers;