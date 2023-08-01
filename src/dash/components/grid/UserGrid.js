import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const UserGrid = ({ url, columns, reload }) => {
  let [data, setdata] = useState([]);

  const [repositories, setRepositories] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  async function getUsers() {
    await axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setRepositories(data.data.data);
        setdata(data.data);
        setPageCount(data.data.last_page);
      });
  }
  useEffect(() => {
    getUsers();
  }, [reload]);

  const getData = async () => {
    await axios
      .get(url + "?page=" + pageOffset)
      .then((response) => response.data)
      .then((data) => {
        setdata(data.data);
        setRepositories(data.data.data);
      });
  };
  useEffect(() => {
    getData();
  }, [pageOffset]);

  const handlePageChange = (event, page) => {
    setPageOffset(page);
  };

  return (
    data.data && (
      <div>
        <DataGrid
          hideFooter
          rows={repositories}
          columns={columns}
          sx={{
            borderRadius: "30px",
            overflow: "hidden",
          }}
        />
        <Pagination
          count={pageCount}
          size="small"
          onChange={handlePageChange}
          className="pagination-container"
        />
      </div>
    )
  );
};

export default UserGrid;
