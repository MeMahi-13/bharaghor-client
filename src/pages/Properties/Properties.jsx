// Property.jsx
import ApprovedPosts from "../dashboard/ApprovedPost";
import UserPendingPosts from "./UserPending";

const Properties = () => {
  return (
   <div>
        <UserPendingPosts />
        <ApprovedPosts />
    </div>
  );
};

export default Properties;
