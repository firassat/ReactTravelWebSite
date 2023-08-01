import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BackButtom from "../../components/BackButtom";
const AddCity = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const id = location.state.id;
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      if (!id) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/admin/country",

          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            ...values,
          }
        );

        console.log(response);
        if (response.status === 200) {
          navigate("/dash");
        } else {
          throw await response;
        }
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/admin/city",

          {
            ...values,
            country_id: id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        if (response.status === 200) {
          navigate("/dash");
        } else {
          throw await response;
        }
      }
    } catch (error) {}
  };
  return (
    <Box mx="200px" my="40px">
      <Header title="ADD Country" />
      <BackButtom />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                variant="filled"
                type="text"
                label=" Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
});
const initialValues = {
  // first_name: "",
  // last_name: "",
  // email: "",
  // phone_number: "",
  // password: "",
};

export default AddCity;
