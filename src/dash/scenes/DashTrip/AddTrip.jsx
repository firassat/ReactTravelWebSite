import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

import GetCity from "../../components/getCity";
import InputDaysTrip from "../../components/InputDaysTrip";

const AddTrip = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [err, seterr] = useState({});
  const [city, setCity] = useState(0);
  const [Country, setCountry] = useState(0);
  const [days_number, setdays_number] = useState(1);
  const [days_data, setdaysfata] = useState({});
  const [days_input, setdays_input] = useState(0);
  const token = localStorage.getItem("_auth");

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trip/addNewTrip",
        {
          ...values,
          trip_company_id: props.id,
          destination: city,
          ...days_data,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        props.setReload((prev) => prev + 1);
        props.setAddScreen([0, 0, 0]);
      } else {
        throw await response;
      }
    } catch (error) {
      seterr(error.response);
    }
  };
  const onSubmitDays = (e) => {
    e.preventDefault();
    for (let i = 1; i <= days_number; i++) {
      days_data[`title_${i}`] = e.target[i - 1].value;
      days_data[`details_${i}`] = e.target[i - 1].value;
    }

    setdays_input(0);
  };
  useEffect(() => {
    setdays_input(days_number);
  }, [days_number]);
  return (
    <Box m="40px auto" width="70%">
      <Header title="Add Trip" />
      {days_input ? (
        <InputDaysTrip days_number={days_number} onSubmitDays={onSubmitDays} />
      ) : null}
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
              <GetCity setCity={setCity} setCountry={setCountry} />
              {setdays_number(values.days_number)}
              <TextField
                variant="filled"
                type="text"
                label="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
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
                type="number"
                label="start_age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.start_age}
                name="start_age"
                error={!!touched.start_age && !!errors.start_age}
                helperText={touched.start_age && errors.start_age}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="end_age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.end_age}
                name="end_age"
                error={!!touched.end_age && !!errors.end_age}
                helperText={touched.end_age && errors.end_age}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="max_persons"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.max_persons}
                name="max_persons"
                error={!!touched.max_persons && !!errors.max_persons}
                helperText={touched.max_persons && errors.max_persons}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                sx={{ gridColumn: "span 2" }}
                select
                label="Days Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.days_number}
                name="days_number"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </TextField>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {err.data && <span style={{ color: "red" }}>{err.data.message}</span>}
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
export default AddTrip;
