import React, { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile(props) {
  const user = useContext(useContext);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
}

export default UserProfile;
