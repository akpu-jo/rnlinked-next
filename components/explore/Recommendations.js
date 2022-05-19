import React from "react";
import UserCard from "../users/UserCard";

const Recommendations = ({ recommendedUsers }) => {
  return (
    <div className=" ml-2">
      {recommendedUsers !== undefined && recommendedUsers.map((user) => (
        <UserCard user={user} key={user._id} />
      ))}
    </div>
  );
};

export default Recommendations;
