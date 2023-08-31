import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddCity from "../AddCity";
import { getDateTimePickerToolbarUtilityClass } from "@mui/x-date-pickers/DateTimePicker/dateTimePickerToolbarClasses";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [repositories, setRepositories] = useState([]);
  const [country, setcountry] = useState(1);
  const [cityNow, setcityNow] = useState([]);
  const [cityData, setcityData] = useState([]);
  let [addScreen, setAddScreen] = useState([0, 0, 0]);
  let [reload, setReload] = useState([]);
  let [select, setSelect] = useState([]);
  let [data, setdata] = useState([]);

  async function getCuntry() {
    await axios
      .get("http://127.0.0.1:8000/api/getCountries")
      .then((response) => response.data)
      // .then((response) => response.data)
      .then((response) => {
        setRepositories(response.countries);
        setcityNow(response.countries[0].name);
      });
  }
  useEffect(() => {
    getCuntry();
  }, [reload]);
  async function getCity() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/showcity?country_id=" + country)
      .then((response) => response.data)
      // .then((response) => response.data)
      .then((response) => setcityData(response.city));
  }
  useEffect(() => {
    getCity();
  }, [country, reload]);

  async function getdata() {
    await axios
      .post(
        "http://127.0.0.1:8000/api/admin/getStatistics",
        {
          last: "week",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data)
      //.then((response) => response.data)
      .then((response) => {
        setdata(response);
      });
  }
  useEffect(() => {
    getdata();
  }, [reload]);
  console.log(data);
  function getDate(date) {
    const d = new Date(date);
    const saveConverted = d.toUTCString();
    return saveConverted;
  }

  return (
    data && (
      <Box m="20px" mx="50px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="MainDashBoard" subtitle="Welcome to this dashboard " />
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          sx={{
            "& ::-webkit-scrollbar": {
              width: 0,
            },
          }}
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="30px"
          >
            <StatBox
              title={data.new_companies}
              subtitle="New Companies"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="30px"
          >
            <StatBox
              title={data.total_reservations}
              subtitle="Total Reservations"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="30px"
          >
            <StatBox
              title={data.new_users}
              subtitle="New Users"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="30px"
          >
            <StatBox
              title={data.total_income}
              subtitle="Total Income"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}

          <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            {/* <Box
              style={{
                color: colors.grey[100],
              }}
            >
              <label htmlFor="fa">Last:</label>
              <select
                id="fa"
                name="selectLast"
                onChange={(e) => setSelect(e.target.value)}
              >
                <option key={"day"} value="day">
                  day
                </option>
                <option key={"week"} value="week">
                  week
                </option>
                <option key={"month"} value="month">
                  month
                </option>
                <option key={"year"} value="year">
                  year
                </option>
              </select>
            </Box> */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Last Users
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 26%)"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="15px !important"
              gap="20px"
              color={colors.grey[100]}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography fontWeight={"900"}>Name</Typography>
              <Typography fontWeight={"900"}>Email</Typography>
              <Typography fontWeight={"900"}>Phone_number</Typography>
              <Typography fontWeight={"900"}>Wallet</Typography>
            </Box>

            {data.last_users &&
              data.last_users.data.map((transaction, i) => (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, 26%)"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="15px !important"
                  gap="20px"
                  key={`${transaction.id}-${i}`}
                  position={"relative"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.first_name}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.email}</Box>
                  <Box color={colors.grey[100]}>{transaction.phone_number}</Box>
                  <Box color={colors.grey[100]}>{transaction.wallet}</Box>
                </Box>
              ))}
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Last Attraction Reservations
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 18%)"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="15px !important"
              gap="20px"
              color={colors.grey[100]}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography fontWeight={"900"}>user_id</Typography>
              <Typography fontWeight={"900"}>adults</Typography>
              <Typography fontWeight={"900"}>children</Typography>
              <Typography fontWeight={"900"}>payment</Typography>
              <Typography fontWeight={"900"}>book_date</Typography>
            </Box>
            {data.last_attraction_reservations &&
              data.last_attraction_reservations.data.map((transaction, i) => (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(5, 18%)"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="15px !important"
                  gap="20px"
                  key={`${transaction.id}-${i}`}
                  position={"relative"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.user_id}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.adults}</Box>
                  <Box color={colors.grey[100]}>{transaction.children}</Box>
                  <Box color={colors.grey[100]}>{transaction.payment}</Box>
                  <Box color={colors.grey[100]}>
                    {getDate(transaction.book_date)}
                  </Box>
                </Box>
              ))}
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Last Flights Reservations
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 18%)"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="15px !important"
              gap="20px"
              color={colors.grey[100]}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography fontWeight={"900"}>user_id</Typography>
              <Typography fontWeight={"900"}>adults</Typography>
              <Typography fontWeight={"900"}>children</Typography>
              <Typography fontWeight={"900"}>payment</Typography>
              <Typography fontWeight={"900"}>created_at</Typography>
            </Box>
            {data.last_flights_reservations &&
              data.last_flights_reservations.data.map((transaction, i) => (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(5, 18%)"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="15px !important"
                  gap="20px"
                  key={`${transaction.id}-${i}`}
                  position={"relative"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.user_id}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>
                    {transaction.num_of_adults}
                  </Box>
                  <Box color={colors.grey[100]}>
                    {transaction.num_of_children}
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.payment}</Box>
                  <Box color={colors.grey[100]}>
                    {getDate(transaction.created_at)}
                  </Box>
                </Box>
              ))}
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Last Hotel Reservations
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 18%)"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="15px !important"
              gap="20px"
              color={colors.grey[100]}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography fontWeight={"900"}>user_id</Typography>
              <Typography fontWeight={"900"}>check_in</Typography>
              <Typography fontWeight={"900"}>check_out</Typography>
              <Typography fontWeight={"900"}>first_name</Typography>
              <Typography fontWeight={"900"}>hotel_id</Typography>
            </Box>
            {data.last_hotel_reservations &&
              data.last_hotel_reservations.data.map((transaction, i) => (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(5, 18%)"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="15px !important"
                  gap="20px"
                  key={`${transaction.id}-${i}`}
                  position={"relative"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.user_id}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.check_in}</Box>
                  <Box color={colors.grey[100]}>{transaction.check_out}</Box>
                  <Box color={colors.grey[100]}>{transaction.first_name}</Box>
                  <Box color={colors.grey[100]}>
                    {getDate(transaction.hotel_id)}
                  </Box>
                </Box>
              ))}
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Last Trip Reservations
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 18%)"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="15px !important"
              gap="20px"
              color={colors.grey[100]}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography fontWeight={"900"}>user_id</Typography>
              <Typography fontWeight={"900"}>adult</Typography>
              <Typography fontWeight={"900"}>child</Typography>
              <Typography fontWeight={"900"}>date_id</Typography>
              <Typography fontWeight={"900"}>payment</Typography>
            </Box>
            {data.last_trip_reservations &&
              data.last_trip_reservations.data.map((transaction, i) => (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(5, 18%)"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="15px !important"
                  gap="20px"
                  key={`${transaction.id}-${i}`}
                  position={"relative"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.user_id}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.adult}</Box>
                  <Box color={colors.grey[100]}>{transaction.child}</Box>
                  <Box color={colors.grey[100]}>{transaction.date_id}</Box>
                  <Box color={colors.grey[100]}>
                    {getDate(transaction.payment)}
                  </Box>
                </Box>
              ))}
          </Box>
          {/* ROW 3 */}
          {/* cuntris */}
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Countries
              </Typography>
            </Box>
            {repositories &&
              repositories.map((e, i) => (
                <Box
                  key={`${e.id}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="10px 15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {e.id}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>
                    <Typography>{e.name}</Typography>
                  </Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    color={"white"}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setcountry(e.id);
                      setcityNow(e.name);
                    }}
                  >
                    show city
                  </Box>
                </Box>
              ))}
          </Box>
          {/* city */}
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            overflow-style="none"
            borderRadius="30px"
            p="15px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              colors={colors.grey[100]}
              p="15px"
              position={"relative"}
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                {cityNow} City
              </Typography>
              {/* <Link to={"/dash/addCity"} state={{ id: country  }}>
              Add City
            </Link> */}

              <IconButton
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "0",
                }}
                onClick={() => setAddScreen([!addScreen[0], 0, 0])}
              >
                <AddIcon />
              </IconButton>
              {addScreen[0] ? (
                <Box
                  className="sentSuccss"
                  sx={{
                    backgroundColor: `${colors.primary[400]} !important `,
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "25px",
                      right: "25px",
                    }}
                    onClick={() => setAddScreen([!addScreen[0], 0, 0])}
                  >
                    <CloseIcon />
                  </IconButton>
                  <AddCity
                    id={country}
                    setReload={setReload}
                    setAddScreen={setAddScreen}
                  />
                </Box>
              ) : null}
            </Box>
            {cityData[0] &&
              cityData.map((e, i) => (
                <Box
                  key={`${e.id}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`1px solid ${colors.primary[800]}`}
                  p="10px 15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {e.id}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>
                    <Typography>{e.name}</Typography>
                  </Box>
                </Box>
              ))}
          </Box>

          {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 20px 10px 20px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="280px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="240px">
            <MainChart isDashboard={true} />
          </Box>
        </Box> */}
        </Box>
      </Box>
    )
  );
};

export default Dashboard;
