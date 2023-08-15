import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import axios from "axios";

const AddRoom = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [err, seterr] = useState({});

  const [type, setType] = useState({});
  const [RoomFeatures, setRoomFeatures] = useState({});
  const AllRoomFeatures = [];

  const token = localStorage.getItem("_auth");

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/hotel/addMultiRooms",
        {
          ...values,
          selectedFeatures: AllRoomFeatures,
          hotel_id: props.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        props.setReload((priv) => priv + 1);
        props.setAddScreen([0, 0, 0]);
      } else {
        throw await response;
      }
    } catch (error) {
      seterr(error);
      console.log(error);
    }
  };

  const roomType = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/api/hotel/getRoomType", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => setType(res.data));
  };
  useEffect(() => {
    roomType();
  }, []);

  const getRoomFeatures = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/api/hotel/getRoomFeatures", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => setRoomFeatures(res.data));
  };
  useEffect(() => {
    getRoomFeatures();
  }, []);
  const handleRoomFeatures = (e) => {
    AllRoomFeatures.push(e.target.value);
    console.log(AllRoomFeatures);
  };
  return (
    <Box m="40px auto">
      <Header title="Add Rooms" />
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
            {console.log(values)}
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(2,50%)">
              <TextField
                variant="filled"
                type="number"
                label="The number of rooms "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.n}
                name="n"
                error={!!touched.n && !!errors.n}
                helperText={touched.n && errors.n}
                //sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                name="details"
                error={!!touched.details && !!errors.details}
                helperText={touched.details && errors.details}
                //sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="price_for_night"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price_for_night}
                name="price_for_night"
                error={!!touched.price_for_night && !!errors.price_for_night}
                helperText={touched.price_for_night && errors.price_for_night}
                //sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sleeps"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Sleeps}
                name="Sleeps"
                error={!!touched.Sleeps && !!errors.Sleeps}
                helperText={touched.Sleeps && errors.Sleeps}
                //sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Beds"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Beds}
                name="Beds"
                error={!!touched.Beds && !!errors.Beds}
                helperText={touched.Beds && errors.Beds}
                //sx={{ gridColumn: "span 2" }}
              />
              <TextField
                //sx={{ gridColumn: "span 2" }}
                select
                label="Room Features"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleRoomFeatures(e);
                  handleChange(e);
                }}
                value={values.RoomFeatures ? values.RoomFeatures : ""}
                name="RoomFeatures"
              >
                <MenuItem disabled>select</MenuItem>
                {RoomFeatures[0] &&
                  RoomFeatures.map((e) => {
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
              </TextField>
              <TextField
                //sx={{ gridColumn: "span 2" }}
                select
                label="Room Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.room_type ? values.room_type : ""}
                name="room_type"
              >
                <MenuItem disabled>select</MenuItem>
                {type[0] &&
                  type.map((e) => {
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
              </TextField>
              {/* <Box backgroundColor={"inherit"}>
                <label htmlFor="fa">Choose a Room Type:</label>
                <select
                  class="form-select form-select-bg:black"
                  id="fa"
                  name="room_type"
                  onChange={handleChange}
                >
                  {type[0] &&
                    type.map((e, i) => {
                      return (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </select>
                {err ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      margin: "10px",
                    }}
                  >
                    {err.message}
                  </p>
                ) : (
                  ""
                )}
              </Box> */}
              <Box
                display="flex"
                flexDirection={"column"}
                m="0"
                fontSize={"12px"}
              >
                {AllRoomFeatures.map((e) => {
                  return <p>{RoomFeatures[e - 1].name}</p>;
                })}
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add
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
export default AddRoom;
