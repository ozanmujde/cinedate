import React, { useState } from "react";
import wlobby from "../api/wlobby";

export default () => {
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [adverts, setAdverts] = useState([]);

  const getUserData = async (userID) => {
    try {
      //   const response = await wlobby.get("/get/user/", {
      //     params: {
      //       UserID: userID,
      //     },
      //   });
      const response = await wlobby.get("/get/user/", {
        params: {
          UserID: 10,
        },
      });
      setUserData(response.data.Item);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };
  return [getUserData, userData, errorMessage];
};
