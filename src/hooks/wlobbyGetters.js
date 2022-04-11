import React, { useState } from "react";
import wlobby from "../api/wlobby";

 export function getUsers(){
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const getUserData = async (userID) => {
    try {
      const response = await wlobby.get("/get/user/", {
        params: {
          UserID: userID,
        },
      });
      setUserData(response.data.Item);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };
  return [getUserData, userData, errorMessage];
}

export function getAdverts() {
  const [adverts, setAdverts] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const getAdverts = async () => {
    try {
      const response = await wlobby.get("/get/adverts/");
      setAdverts(response.data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };
  return [getAdverts, adverts, errorMessage];
}