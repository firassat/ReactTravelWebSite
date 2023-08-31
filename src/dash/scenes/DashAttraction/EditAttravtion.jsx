import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButtom from "../../components/BackButtom";
import AvailableDays from "../../components/AvailableDays";
import { tokens } from "../../../theme";
const EditAttraction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [err, seterr] = useState({});
  const [send, setsend] = useState(0);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(0);

  const initialValues = {
    name: data.name,
    email: data.email,
    phone_number: data.phone_number,
    details: data.details,
    adult_ability_per_day: data.adult_ability_per_day,
    adult_price: data.adult_price,
    // // available_days: data.available_days,
    child_ability_per_day: data.child_ability_per_day,
    child_price: data.child_price,
    close_at: data.close_at,
    location: data.location,
    // num_of_ratings: data.num_of_ratings,
    open_at: data.open_at,
    website_url: data.website_url,

    // city_id: data.city_id,
  };
  const initial = [
    data.available_days.Saturday,
    data.available_days.Sunday,
    data.available_days.Monday,
    data.available_days.Tuesday,
    data.available_days.Wednesday,
    data.available_days.Thursday,
    data.available_days.Friday,
  ];

  const days = [];
  days["Saturday"] = checked[0];
  days["Sunday"] = checked[1];
  days["Monday"] = checked[2];
  days["Tuesday"] = checked[3];
  days["Wednesday"] = checked[4];
  days["Thursday"] = checked[5];
  days["Friday"] = checked[6];

  const handleFormSubmit = async (values) => {
    try {
      if (localStorage.getItem("_auth_type") === "main_admin") {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/admin/editAttractionDetails",

          {
            headers: {
              Accept: "application/json",
            },
            ...values,
            id: data.id,
            ...days,
          }
        );
        if (response.status === 200) {
          navigate("/dash/showAttraction", { state: { id: data.id } });
        } else {
          throw await response;
        }
      } else {
        const token = localStorage.getItem("_auth");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/attraction/editAttractionDetails",
          {
            ...values,
            id: data.id,
            ...days,
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
        } else {
          throw await response;
        }
      }
    } catch (error) {
      seterr(error);
      console.log(error);
    }
  };

  return (
    <Box m="40px auto" width="70%">
      <Header title="Edit Attraction" />
      <BackButtom />
      <AvailableDays setChecked={setChecked} initial={initial} />
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
                Edit
              </Button>
            </Box>
            {send ? (
              <Box
                className="sentSuccss"
                sx={{
                  backgroundColor: `${colors.primary[400]} !important `,
                }}
              >
                <h2>Updates sent successfully, pending approval.</h2>
              </Box>
            ) : (
              ""
            )}
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

export default EditAttraction;
