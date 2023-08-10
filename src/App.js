import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./font/stylesheet.css";
import MainNavbar from "./components/navbar/Main-navbar";
import Head from "./components/header/Header";
import Home from "./pages/Home/home";
import Hotel from "./pages/Hotels/hotel";
import Flight from "./pages/Flights/flight";
import Trip from "./pages/Trips/trip";
import Attraction from "./pages/Attractions/Attraction";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register";
import Reservation from "./pages/Reservation/Reservation.jsx";
// import SeR from "./components/tenm/SearchResult";

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
  UserForm,
  AdminForm,
  EditForm,
  Calendar,
  Company,
  Login2,
  ShowAttraction,
  EditAttraction,
  AddAttraction,
  ShowTrip,
  EditTrip,
  AddTrip,
  AddTripCompany,
  ShowHotel,
  AddHotel,
  ReservationsTrip,
  TripDetails,
  Nav,
  AddCity,
} from "./dash/scenes/index.js";
import "./App.css";

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
                  <Route path="" element={<Home />}></Route>
                  <Route path="hotels" element={<Hotel />}></Route>
                  <Route path="flights" element={<Flight />}></Route>
                  <Route path="trips" element={<Trip />}></Route>
                  <Route path="attractions" element={<Attraction />}></Route>
                  <Route path="aaaa" element={<Head name="trips" />}></Route>
                  {/* <Route path="searchresult" element={<SeR />}></Route>  */}
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />

                  {/*  <Route exact path="/ss" element={<TT />} /> 
                //  <Route
                //   path="/search"
                //   element={
                //     <SearchResults
                //       searchQuery={new URLSearchParams(window.location.search).get("q")}
                //     />
                //   }
                // />*/}
                  <Route path="reservation" element={<Reservation />} />
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
                          {isSidebar && <SidebarTrip isSidebar={isSidebar} />}
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
