import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  let [data, setdata] = useState([]);
  const repo = location.state.repo;
  let url;
  if (repo.type === "attraction_company")
    url = "http://127.0.0.1:8000/api/admin/getUpdatingDetails?id=";
  else if (repo.type === "trip_company")
    url = "http://127.0.0.1:8000/api/admin/getTripUpdatingDetails?id=";

  async function getUsers() {
    await axios
      .get(url + repo.id)
      .then((response) => response.data)
      .then((data) => {
        setdata(data);
      });
    console.log(repo.id);
  }
  useEffect(() => {
    getUsers();
  }, [repo]);

  return <div>Nav</div>;
}

export default Nav;
