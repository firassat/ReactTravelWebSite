import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  let [data, setdata] = useState([]);
  const repo = location.state.repo;

  async function getUsers() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/getUpdatingDetails?id=" + repo.id)
      .then((response) => response.data)
      .then((data) => {
        setdata(data);
      });
    console.log(repo);
  }
  useEffect(() => {
    getUsers();
  }, [repo]);

  return <div>Nav</div>;
}

export default Nav;
