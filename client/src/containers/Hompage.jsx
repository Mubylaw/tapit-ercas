import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "./Landing";

const Homepage = ({
  currentUser,
  Page,
  position,
  title,
  type,
  removeError,
}) => {
  const navigate = useNavigate();
  console.log(currentUser);

  return (
    <>
      {currentUser.isAuthenticated ? (
        <Page user={currentUser.user} type={type} />
      ) : (
        <Landing />
      )}
    </>
  );
};

export default Homepage;
