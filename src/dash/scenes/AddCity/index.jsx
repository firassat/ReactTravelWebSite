import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import BackButtom from "../../components/BackButtom";
const AddCity = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      if (!props.id) {
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
        if (response.status === 200) {
          props.setAddScreen([0, 0, 0]);
          props.setReload((pre) => pre + 1);
        } else {
          throw await response;
        }
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/admin/city",

          {
            ...values,
            country_id: props.id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          props.setAddScreen([0, 0, 0]);
          props.setReload((pre) => pre + 1);
        } else {
          throw await response;
        }
      }
    } catch (error) {}
  };
  return (
    <Box mx="200px" my="40px">
      <Header title={`${props.id ? "Add City" : "Add Country"}`} />

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
