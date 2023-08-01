import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import BackButtom from "../../components/BackButtom";

const AddAttraction = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [err, seterr] = useState({});
  const [send, setsend] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("_auth");

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/attraction/addAttractionCompany",
        {
          ...values,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setsend(1);
        setTimeout(() => {
          navigate("/dashAttraction");
        }, 5000);
        console.log(response);
      } else {
        throw await response;
      }
    } catch (error) {
      seterr(error);
    }
  };

  return (
    <Box m="40px auto" width="70%">
      <Header title="Add Attraction" />
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="website_url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.website_url}
                name="website_url"
                error={!!touched.website_url && !!errors.website_url}
                helperText={touched.website_url && errors.website_url}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                name="details"
                error={!!touched.details && !!errors.details}
                helperText={touched.details && errors.details}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="phone"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone_number}
                name="phone_number"
                error={!!touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="adult_ability_per_day"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adult_ability_per_day}
                name="adult_ability_per_day"
                error={
                  !!touched.adult_ability_per_day &&
                  !!errors.adult_ability_per_day
                }
                helperText={
                  touched.adult_ability_per_day && errors.adult_ability_per_day
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="adult_price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adult_price}
                name="adult_price"
                error={!!touched.adult_price && !!errors.adult_price}
                helperText={touched.adult_price && errors.adult_price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="available_days"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.available_days}
                name="available_days"
                error={!!touched.available_days && !!errors.available_days}
                helperText={touched.available_days && errors.available_days}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="child_ability_per_day"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.child_ability_per_day}
                name="child_ability_per_day"
                error={
                  !!touched.child_ability_per_day &&
                  !!errors.child_ability_per_day
                }
                helperText={
                  touched.child_ability_per_day && errors.child_ability_per_day
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="child_price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.child_price}
                name="child_price"
                error={!!touched.child_price && !!errors.child_price}
                helperText={touched.child_price && errors.child_price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="city_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city_id}
                name="city_id"
                error={!!touched.city_id && !!errors.city_id}
                helperText={touched.city_id && errors.city_id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="attraction_type_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.attraction_type_id}
                name="attraction_type_id"
                error={
                  !!touched.attraction_type_id && !!errors.attraction_type_id
                }
                helperText={
                  touched.attraction_type_id && errors.attraction_type_id
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="open_at"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.open_at}
                name="open_at"
                error={!!touched.open_at && !!errors.open_at}
                helperText={touched.open_at && errors.open_at}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="close_at"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.close_at}
                name="close_at"
                error={!!touched.close_at && !!errors.close_at}
                helperText={touched.close_at && errors.close_at}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add
              </Button>
              {send ? (
                <Box className="sentSuccss">
                  <h2>Updates sent successfully, pending approval.</h2>
                </Box>
              ) : (
                ""
              )}
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
  // first_name: yup.string().required("required"),
  // last_name: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // phone_number: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // password: yup.string().required().min(6),
  // password_confirmation: yup.string().required().min(6),
  // wallet: yup.string().required(),
  // points: yup.string().required(),
});
const initialValues = {
  // name: "",
  // email: data.email,
  // phone_number: data.phone_number,
  // details: data.details,
  // adult_ability_per_day: data.adult_ability_per_day,
  // adult_price: data.adult_price,
  // available_days: data.available_days,
  // child_ability_per_day: data.child_ability_per_day,
  // child_price: data.child_price,
  // close_at: data.close_at,
  // location: data.location,
  // num_of_ratings: data.num_of_ratings,
  // open_at: data.open_at,
  // website_url: data.website_url,
};
export default AddAttraction;
