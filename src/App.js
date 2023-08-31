import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./font/stylesheet.css";
import "./App.css";
import MainNavbar from "./website/components/navbar/Main-navbar";
import Home from "./website/pages/Home/home";
import Hotel from "./website/pages/Hotels/hotel";
import Flight from "./website/pages/Flights/flight";
import Trip from "./website/pages/Trips/trip";
import Attraction from "./website/pages/Attractions/Attraction";
import Login from "./website/pages/Login/Login.jsx";
import Register from "./website/pages/Login/Register";
import Forgetpassword from "./website/pages/Login/Forgetpassword";
import Resetpassword from "./website/pages/Login/resetpassword";
import Reservation from "./website/pages/Reservation/Reservation.jsx";
import SearchResult from "./website/pages/Searchresult/SearchResult";
import Details from "./website/pages/Details/Details";
import VerifyEmail from "./website/pages/Login/verifyeamil";
import Profile from "./website/components/profile/profile";
import "./App.css";
//dashborad
import { Box } from "@mui/material";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import {
  UserTeam,
  AdminTeam,
  Topbar,
  TopbarSec,
  Dashboard,
  SidebarMain,
  SidebarAtt,
  SidebarTrip,
  SidebarHotel,
  UserForm,
  EditForm,
  Calendar,
  Company,
  Login2,
  ShowAttraction,
  EditAttraction,
  AddAttraction,
  ReservationsAtt,
  ShowTrip,
  EditTrip,
  AddTrip,
  AddTripCompany,
  ShowHotel,
  ShowRoom,
  AddHotel,
  ReservationsHotel,
  ReservationsTrip,
  TripDetails,
  Nav,
  AddCity,
  ShowFlight,
} from "./dash/scenes/index.js";

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import TT from "./components/take it/take";
// import SearchResults from "./components/take it/SearchResults";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const ProtectedRouteMainAdmin = ({ children }) => {
    if (localStorage.getItem("_auth_type") !== "main_admin") {
      return <Navigate to="/dash/login" />;
    }
    return children;
  };
  const ProtectedRouteAttAdmin = ({ children }) => {
    if (localStorage.getItem("_auth_type") !== "attraction_admin") {
      return <Navigate to="/dash/login" />;
    }
    return children;
  };
  const ProtectedRouteTripAdmin = ({ children }) => {
    if (localStorage.getItem("_auth_type") !== "trip_admin") {
      return <Navigate to="/dash/login" />;
    }
    return children;
  };
  const ProtectedRouteHotelAdmin = ({ children }) => {
    if (localStorage.getItem("_auth_type") !== "hotel_admin") {
      return <Navigate to="/dash/login" />;
    }
    return children;
  };
  const ProtectedRouteFlightAdmin = ({ children }) => {
    if (localStorage.getItem("_auth_type") !== "flight_admin") {
      return <Navigate to="/dash/login" />;
    }
    return children;
  };

  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <Routes>
          {/* main */}
          <Route
            exact
            path="/*"
            element={
              <>
                <MainNavbar />
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route exact path="" element={<Home />}></Route>
                  <Route path="hotels" element={<Hotel />}></Route>
                  <Route path="flights" element={<Flight />}></Route>
                  <Route exact path="trips" element={<Trip />}></Route>
                  <Route
                    exact
                    path="attractions"
                    element={<Attraction />}
                  ></Route>
                  <Route path="searchresult" element={<SearchResult />}></Route>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="forgetpassword" element={<Forgetpassword />} />
                  <Route path="reservation" element={<Reservation />} />
                  <Route path="details" element={<Details />} />
                  <Route path="resetpassword" element={<Resetpassword />} />
                  <Route path="verifyemail" element={<VerifyEmail />} />
                </Routes>
              </>
            }
          ></Route>
          {/* maindashboard */}
          <Route path="dash/login" element={<Login2 />} />
          <Route
            exact
            path="dash/*"
            element={
              <ProtectedRouteMainAdmin>
                <RequireAuth loginPath={"login"}>
                  <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <div className="app">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <main className="content" style={{ display: "flex" }}>
                          {isSidebar && <SidebarMain isSidebar={isSidebar} />}
                          <Box flexGrow={1}>
                            <Routes>
                              <Route path="" element={<Dashboard />} />
                              <Route
                                path="/adminTeam"
                                element={<AdminTeam />}
                              />
                              <Route path="/calendar" element={<Calendar />} />
                              <Route path="/company" element={<Company />} />
                              <Route path="/userTeam" element={<UserTeam />} />
                              <Route path="/userform" element={<UserForm />} />
                              <Route path="/editUser" element={<EditForm />} />
                              <Route
                                path="/showAttraction"
                                element={<ShowAttraction />}
                              />
                              <Route
                                path="/editAttraction"
                                element={<EditAttraction />}
                              />
                              <Route path="/showTrip" element={<ShowTrip />} />
                              <Route path="/editTrip" element={<EditTrip />} />
                              <Route
                                path="/tripDetails"
                                element={<TripDetails />}
                              />
                              <Route
                                path="/reservationsTrip"
                                element={<ReservationsTrip />}
                              />
                              <Route
                                path="/showHotel"
                                element={<ShowHotel />}
                              />
                              <Route
                                path="/showFlight"
                                element={<ShowFlight />}
                              />
                              <Route path="/addHotel" element={<AddHotel />} />
                              <Route path="/nav" element={<Nav />} />
                            </Routes>
                          </Box>
                        </main>
                      </div>
                    </ThemeProvider>
                  </ColorModeContext.Provider>
                </RequireAuth>
              </ProtectedRouteMainAdmin>
            }
          ></Route>
          {/* attractionDashboard */}
          <Route
            exact
            path="dashAttraction/*"
            element={
              <ProtectedRouteAttAdmin>
                <RequireAuth loginPath={"/dash/login"}>
                  <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <div className="app">
                        <TopbarSec setIsSidebar={setIsSidebar} />
                        <main className="content" style={{ display: "flex" }}>
                          {isSidebar && <SidebarAtt isSidebar={isSidebar} />}
                          <Box flexGrow={1}>
                            <Routes>
                              <Route path="" element={<ShowAttraction />} />
                              <Route
                                path="/addAttraction"
                                element={<AddAttraction />}
                              />
                              <Route
                                path="/editAttraction"
                                element={<EditAttraction />}
                              />
                              <Route
                                path="/reservationsAtt"
                                element={<ReservationsAtt />}
                              />
                            </Routes>
                          </Box>
                        </main>
                      </div>
                    </ThemeProvider>
                  </ColorModeContext.Provider>
                </RequireAuth>
              </ProtectedRouteAttAdmin>
            }
          ></Route>
          {/* TripDashboard */}
          <Route
            exact
            path="dashTrip/*"
            element={
              <ProtectedRouteTripAdmin>
                <RequireAuth loginPath={"/dash/login"}>
                  <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <div className="app">
                        <TopbarSec setIsSidebar={setIsSidebar} />
                        <main className="content" style={{ display: "flex" }}>
                          {isSidebar && <SidebarTrip isSidebar={isSidebar} />}
                          <Box flexGrow={1}>
                            <Routes>
                              <Route path="" element={<ShowTrip />} />
                              <Route path="/addTrip" element={<AddTrip />} />
                              <Route
                                path="/addTripCompany"
                                element={<AddTripCompany />}
                              />
                              <Route
                                path="/reservationsTrip"
                                element={<ReservationsTrip />}
                              />
                              <Route path="/editTrip" element={<EditTrip />} />
                              <Route
                                path="/tripDetails"
                                element={<TripDetails />}
                              />
                            </Routes>
                          </Box>
                        </main>
                      </div>
                    </ThemeProvider>
                  </ColorModeContext.Provider>
                </RequireAuth>
              </ProtectedRouteTripAdmin>
            }
          ></Route>
          {/* HotelDashboard */}
          <Route
            exact
            path="dashHotel/*"
            element={
              <ProtectedRouteHotelAdmin>
                <RequireAuth loginPath={"/dash/login"}>
                  <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <div className="app">
                        <TopbarSec setIsSidebar={setIsSidebar} />
                        <main className="content" style={{ display: "flex" }}>
                          {isSidebar && <SidebarHotel isSidebar={isSidebar} />}
                          <Box flexGrow={1}>
                            <Routes>
                              <Route path="" element={<ShowHotel />} />
                              <Route path="/addHotel" element={<AddHotel />} />
                              <Route
                                path="/addTripCompany"
                                element={<AddTripCompany />}
                              />
                              <Route
                                path="/reservationsTrip"
                                element={<ReservationsTrip />}
                              />
                              <Route path="/editTrip" element={<EditTrip />} />
                              <Route
                                path="/tripDetails"
                                element={<TripDetails />}
                              />
                              <Route path="/showRoom" element={<ShowRoom />} />
                              <Route
                                path="/reservationsHotel"
                                element={<ReservationsHotel />}
                              />
                            </Routes>
                          </Box>
                        </main>
                      </div>
                    </ThemeProvider>
                  </ColorModeContext.Provider>
                </RequireAuth>
              </ProtectedRouteHotelAdmin>
            }
          ></Route>
          {/* FlightDashboard */}
          <Route
            exact
            path="dashFlight/*"
            element={
              <ProtectedRouteFlightAdmin>
                <RequireAuth loginPath={"/dash/login"}>
                  <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <div className="app">
                        <TopbarSec setIsSidebar={setIsSidebar} />
                        <main className="content" style={{ display: "flex" }}>
                          {isSidebar && <SidebarHotel isSidebar={isSidebar} />}
                          <Box flexGrow={1}>
                            <Routes>
                              <Route path="" element={<ShowHotel />} />
                              <Route path="/addHotel" element={<AddHotel />} />
                            </Routes>
                          </Box>
                        </main>
                      </div>
                    </ThemeProvider>
                  </ColorModeContext.Provider>
                </RequireAuth>
              </ProtectedRouteFlightAdmin>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
