import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BackButtom from "../../components/BackButtom";

const AdminForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const locaction = useLocation();
  const url = locaction.state.url;

  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        url,

        {
          headers: {
            Accept: "application/json",
          },
          ...values,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/dash/adminTeam");
      } else {
        throw await response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mx="200px" my="40px">
      <Header title="ADD Admin" subtitle="Create a new profile for all uses" />
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
                fullWidth
                variant="filled"
                type="text"
                label="UserName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.user_name}
                name="user_name"
                error={!!touched.user_name && !!errors.user_name}
                helperText={touched.user_name && errors.user_name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Admin
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
  user_name: yup.string().required("required"),

  password: yup.string().required().min(6),
});
const initialValues = {
  // first_name: "",
  // last_name: "",
  // email: "",
  // phone_number: "",
  // password: "",
};

export default AdminForm;
