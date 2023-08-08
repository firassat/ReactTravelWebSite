import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import BackButtom from "../../components/BackButtom";
import GetCity from "../../components/getCity";
import InputDaysTrip from "../../components/InputDaysTrip";

const AddTripCompany = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [err, seterr] = useState({});
  const [send, setsend] = useState(0);
  const [cuntry, setCountry] = useState(0);
  const [city, setCity] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("_auth");

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trip/addTripCompany",
        {
          ...values,
          country_id: cuntry,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setsend(1);
        setTimeout(() => {
          navigate("/dashTrip");
        }, 5000);
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
              <GetCity setCountry={setCountry} setCity={setCity} />
              <TextField
                variant="filled"
                type="text"
                label="name"
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
                label="email"
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
                type="phone"
                label="phone_number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone_number}
                name="phone_number"
                error={!!touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add
              </Button>
              {send ? (
                <Box className="sentSuccss" textAlign={"center"}>
                  <h2>Updates sent successfully, pending approval</h2>
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
export default AddTripCompany;
