import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Row, Col, Typography } from "antd";
import { TbMapSearch } from "react-icons/tb";
import {
  BsCloudDrizzle,
  BsCloudFog,
  BsCloudLightningRain,
  BsCloudRainHeavy,
  BsClouds,
} from "react-icons/bs";
import { BiCloudSnow } from "react-icons/bi";
import nature from "../assets/image/nature.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Loading from "./Loading";
import News from "./News";
import gif from "../assets/unknown_location.gif";
import Divider from "@mui/material/Divider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import CloudIcon from "@mui/icons-material/Cloud";
import FeedIcon from "@mui/icons-material/Feed";

const { Title } = Typography;
const Weather = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  const [search, setSearch] = useState("manila");
  const [currentData, setCurrentData] = useState([]);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const handleSubmit = (event) => {
    // cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. For example, this can be useful when: Clicking on a "Submit" button,
    event.preventDefault();
    setSearch(input);
  };
  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    axios
      .get(
        `${process.env.REACT_APP_API_URL_FORECAST}q=${search}&appid=${process.env.REACT_APP_API_KEY_FORECAST}`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setInput("");
        setError(null);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setInput("");
          setError("No Data");
        }
      });
    axios
      .get(
        `${process.env.REACT_APP_API_URL_CURRENT}q=${search}&appid=${process.env.REACT_APP_API_KEY_CURRENT}`
      )
      .then((response) => {
        setCurrentData(response.data);
        console.log(response.data);
        setInput("");
        setError(null);
      })
      .catch(function (error) {
        if (error.response) {
          setInput("");
          setError("No Data");
        }
      });

    return () => {
      clearInterval(id);
    };
  }, [search]);

  let emoji = null;
  if (typeof currentData?.main != "undefined") {
    if (currentData?.weather?.[0]?.main === "Clouds") {
      emoji = <BsClouds />;
    } else if (currentData?.weather?.[0]?.main === "Thunderstorm") {
      emoji = <BsCloudLightningRain />;
    } else if (currentData?.weather?.[0]?.main === "Drizzle") {
      emoji = <BsCloudDrizzle />;
    } else if (currentData?.weather?.[0]?.main === "Rain") {
      emoji = <BsCloudRainHeavy />;
    } else if (currentData?.weather?.[0]?.main === "Snow") {
      emoji = <BiCloudSnow />;
    } else {
      emoji = <BsCloudFog />;
    }
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const getIcon = (iconValue) => {
    let icons = null;
    if (typeof data?.list?.[iconValue]?.main != "undefined") {
      if (data?.list?.[iconValue]?.weather?.[0]?.main === "Clouds") {
        icons = <BsClouds />;
      } else if (
        data?.list?.[iconValue]?.weather?.[0]?.main === "Thunderstorm"
      ) {
        icons = <BsCloudLightningRain />;
      } else if (data?.list?.[iconValue]?.weather?.[0]?.main === "Drizzle") {
        icons = <BsCloudDrizzle />;
      } else if (data?.list?.[iconValue]?.weather?.[0]?.main === "Rain") {
        icons = <BsCloudRainHeavy />;
      } else if (data?.list?.[iconValue]?.weather?.[0]?.main === "Snow") {
        icons = <BiCloudSnow />;
      } else {
        icons = <BsCloudFog />;
      }
      return icons;
    } else {
      return (
        <div>
          <Loading />
        </div>
      );
    }
  };

  // toFixed(2) js function gives 2 decimal point
  let temp = (currentData?.main?.temp - 273.15).toFixed(2);
  let temp_min = (currentData?.main?.temp_min - 273.15).toFixed(2);
  let temp_max = (currentData?.main?.temp_max - 273.15).toFixed(2);
  let humidity = currentData?.main?.humidity;
  let wind = currentData?.wind?.speed;

  const getTime = (timeValue) => {
    var time = data?.list?.[timeValue]?.dt_txt;
    var datedate = new Date(time);
    var setTime = datedate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return setTime;
  };

  const getTemp = (value) => {
    return (data?.list?.[value]?.main?.temp - 273.15).toFixed(2);
  };

  const tempArray = [
    {
      number: 0,
      temp: getTemp(0),
      icons: getIcon(0),
      time: getTime(0),
    },
    {
      number: 1,
      temp: getTemp(1),
      icons: getIcon(1),
      time: getTime(1),
    },
    {
      number: 2,
      temp: getTemp(2),
      icons: getIcon(2),
      time: getTime(2),
    },
    {
      number: 3,
      temp: getTemp(3),
      icons: getIcon(3),
      time: getTime(3),
    },
  ];

  return (
    <div>
      <div className="blur" style={{ top: "-10%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-6rem" }}></div>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box className="container" sx={{ height: "100vh" }}>
          <div className="content">
            <div className="left-side">
              <img src={nature} alt="nature" className="weather-img" />
              <div className="weather-upper">
                <Title
                  level={4}
                  style={{ color: "rgb(50,120,127)", fontWeight: "900" }}
                >
                  Bry - Weather App
                </Title>
                {error === null ? (
                  <>
                    <button>
                      <TbMapSearch /> {data?.city?.name} {data?.city?.country}
                    </button>
                  </>
                ) : (
                  <>
                    <button>
                      <TbMapSearch /> Unknown Location
                    </button>
                  </>
                )}
              </div>
              <div className="weather-center">
                <Title level={3} className="subTitle">
                  The Only Weather App You Need !
                </Title>
                <hr style={{ width: "250px" }} />
                <form onSubmit={handleSubmit}>
                  <Paper
                    className="search-field"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 360,
                      marginTop: "12px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search City Name"
                      inputProps={{ "aria-label": "search city name" }}
                      name="search"
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      required
                    />
                    <IconButton
                      type="submit"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </form>
              </div>
              <div className="weather-footer">
                Made with React Js / Rapid Api
              </div>
            </div>

            <div className="right-side">
              <div className="right-side-content">
                <div className="upper-right-description">
                  <Box sx={{ width: "100%" }}>
                    <Box>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        className="tabs"
                      >
                        <Tab
                          icon={<CloudIcon />}
                          label="Weather"
                          {...a11yProps(0)}
                        />
                        <Tab
                          icon={<FeedIcon />}
                          label="News"
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <Title level={2}>Today</Title>
                      <Card
                        sx={{ minWidth: 175 }}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          borderRadius: "15px",
                        }}
                      >
                        {error === null ? (
                          <>
                            <CardContent>
                              <Row
                                style={{
                                  justifyContent: "center",
                                  display: "flex",
                                  alignItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                <Col
                                  span={12}
                                  xs={24}
                                  sm={24}
                                  lg={12}
                                  style={{ marginBottom: "10px" }}
                                >
                                  <div className="temp_emoji">
                                    <p>{currentData?.weather?.[0]?.main}</p>
                                    <span style={{ fontSize: "30px" }}>
                                      {emoji}
                                    </span>
                                  </div>
                                  <Title
                                    level={2}
                                    style={{
                                      color: "rgb(50,120,127)",
                                      marginTop: "-8px",
                                    }}
                                  >
                                    {temp} &deg;C
                                  </Title>
                                  <Title
                                    variant="caption"
                                    level={5}
                                    display="block"
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {currentData?.weather?.[0]?.description}
                                  </Title>
                                  {day} , {month} {date} {year}
                                  <br />
                                  {`${dateTime.toLocaleTimeString()}`}
                                </Col>
                                <Col span={12} xs={24} sm={24} lg={12}>
                                  <Title
                                    variant="caption"
                                    level={5}
                                    display="block"
                                  >
                                    Humidity: {humidity}%
                                  </Title>
                                  <Title
                                    variant="caption"
                                    level={5}
                                    display="block"
                                  >
                                    Min Temp: {temp_min} &deg;C
                                  </Title>
                                  <Title
                                    variant="caption"
                                    level={5}
                                    display="block"
                                  >
                                    Max Temp: {temp_max} &deg;C
                                  </Title>
                                  <Title
                                    variant="caption"
                                    level={5}
                                    display="block"
                                  >
                                    Wind: {wind} mph
                                  </Title>
                                </Col>
                              </Row>
                            </CardContent>
                          </>
                        ) : (
                          <>
                            <CardContent>
                              <center>
                                No Data To Be Shown, Please Try Again
                              </center>
                            </CardContent>
                          </>
                        )}
                      </Card>
                      {error !== null && (
                        <img
                          src={gif}
                          alt="gif"
                          style={{
                            width: "100%",
                            height: "15%",
                            marginTop: "20px",
                          }}
                        ></img>
                      )}
                      <Title level={2}>
                        More on {data?.city?.name} {data?.city?.country}
                      </Title>
                      <Card
                        sx={{ minWidth: 175 }}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          borderRadius: "15px",
                        }}
                      >
                        {error === null ? (
                          <>
                            <CardContent>
                              <Row
                                style={{
                                  justifyContent: "space-between",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                {tempArray?.map(
                                  ({ number, temp, time, icons }) => {
                                    return (
                                      <>
                                        <Col
                                          span={4}
                                          xs={24}
                                          sm={8}
                                          md={8}
                                          lg={4}
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.5rem",
                                            padding: "20px 0px",
                                          }}
                                        >
                                          <Title
                                            level={4}
                                            style={{ color: "rgb(50,120,127)" }}
                                          >
                                            {temp} &deg;C
                                          </Title>
                                          <div className="temp_emoji">
                                            <p>
                                              {
                                                data?.list?.[`${number}`]
                                                  ?.weather?.[0]?.main
                                              }
                                            </p>
                                            <span style={{ fontSize: "30px" }}>
                                              {icons}
                                            </span>
                                          </div>
                                          <Title
                                            variant="caption"
                                            level={5}
                                            display="block"
                                            style={{
                                              textTransform: "uppercase",
                                              fontSize: "12px", marginTop: '-2px'
                                            }}
                                          >
                                            {
                                              data?.list?.[`${number}`]
                                                ?.weather?.[0]?.description
                                            }
                                          </Title>
                                          {time}
                                        </Col>
                                        {number >= 3 ? (
                                          <></>
                                        ) : (
                                          <>
                                            <Divider
                                              orientation="vertical"
                                              flexItem
                                            />
                                          </>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </Row>
                            </CardContent>
                          </>
                        ) : (
                          <>
                            <CardContent>
                              <center>
                                No Data To Be Shown, Please Try Again
                              </center>
                            </CardContent>
                          </>
                        )}
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <div className="lower-right-description">
                        {error === null ? (
                          <>
                            <Title level={2}>
                              News in {data?.city?.name} {data?.city?.country}
                            </Title>
                            <News country={`${data?.city?.name}`} />
                          </>
                        ) : (
                          <>
                            <Title level={2}>News Today</Title>
                            <Card>
                              <CardContent>
                                <center>
                                  No Data To Be Shown, Please Try Again
                                </center>
                              </CardContent>
                            </Card>
                          </>
                        )}
                      </div>
                    </TabPanel>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Weather;
