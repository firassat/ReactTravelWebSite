import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButtom from "../../components/BackButtom";
const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [state, setstate] = useState(0);
  const [err, seterr] = useState({});
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/addUser",

        {
          headers: {
            Accept: "application/json",
          },
          ...values,
        }
      );
      if (response.status === 200) {
        navigate("/dash/team");
      } else {
        throw await response;
      }
    } catch (error) {
      seterr(error);
    }
  };

  return (
    <Box mx="200px" my="40px">
      <Header title="ADD USER" subtitle="Create a new profile for all uses" />
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
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
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="password_confirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="password_confirmation"
                error={
                  !!touched.password_confirmation &&
                  !!errors.password_confirmation
                }
                helperText={
                  touched.password_confirmation && errors.password_confirmation
                }
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="phone"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="phone_number"
                error={!!touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Wallet"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="wallet"
                error={!!touched.wallet && !!errors.wallet}
                helperText={touched.wallet && errors.wallet}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Points"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="points"
                error={!!touched.points && !!errors.points}
                helperText={touched.points && errors.points}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {state ? (
        <h5
          style={{
            color: "#4CAF50",
            margin: "20px",
          }}
        >
          successfully registered
        </h5>
      ) : (
        ""
      )}
      {!state && err.response ? (
        <h5
          style={{
            color: "red",
            margin: "20px",
          }}
        >
          Error
        </h5>
      ) : (
        ""
      )}
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required().min(6),
  password_confirmation: yup.string().required().min(6),
  wallet: yup.string().required(),
  points: yup.string().required(),
});
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
};

export default UserForm;
