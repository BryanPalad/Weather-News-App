import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Row, Col, Typography } from 'antd';
import {TbMapSearch} from 'react-icons/tb';
import { GrMapLocation } from "react-icons/gr";
import {BsCloudDrizzle, BsCloudFog, BsCloudLightningRain, BsCloudRainHeavy, BsClouds} from 'react-icons/bs';
import {BiCloudSnow} from 'react-icons/bi';
import nature from '../assets/image/nature.jpg';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Loading from './Loading';
import News from './News';
import gif from '../assets/unknown_location.gif';
const {Title} = Typography;
const Weather = () => {
  // Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });
  
  const [search, setSearch] = useState("manila");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const handleSubmit = (event) => {
    // cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. For example, this can be useful when: Clicking on a "Submit" button,
    event.preventDefault();
    setSearch(input);
  }

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`).then((response) => {
        setData(response.data)
        setInput('');
        setError(null);
    })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setInput('');
                setError('No Data');
              }
        })   
        return () => {
          clearInterval(id);
      }
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = <BsClouds/>;
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = <BsCloudLightningRain/>;
    } else if (data.weather[0].main === "Drizzle") {
      emoji = <BsCloudDrizzle/>;
    } else if (data.weather[0].main === "Rain") {
      emoji = <BsCloudRainHeavy/>;
    } else if (data.weather[0].main === "Snow") {
      emoji = <BiCloudSnow/>;
    } else {
      emoji = <BsCloudFog/>;
    }
  } else {
    return <div><Loading/></div>;
  }
  // toFixed(2) js function gives 2 decimal point
  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);
  let humidity = (data.main.humidity);
  let wind = (data.wind.speed);
  return (
    <div>
      <div className="blur" style={{top: '-10%', right: '0'}}></div>
       <div className="blur" style={{top: '36%', left: '-6rem'}}></div>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box className="container" sx={{ height: '100vh' }}>
            <div className="content">
              <div className='left-side'> 
                {/* <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} alt='nature' className='weather-img'/> */}
                <img src={nature} alt='nature' className='weather-img'/>
                <div className='weather-upper'>
                <Title level={4} style={{color: 'rgb(50,120,127)', fontWeight: '900'}}>
                  Bry - Weather App
                </Title>
                {error === null ? (<><button><TbMapSearch/> {data.name} {data.sys.country}</button></>):(<><button><TbMapSearch/> Unknown Location</button></>)}
                
                </div>
                <div className="weather-center"> 
                  <Title level={3} className='subTitle'>The Only Weather App You Need !</Title>
                  <hr style={{width: '250px'}}/>
                  <form onSubmit={handleSubmit}>
                  <Paper
                    className='search-field'
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 360, marginTop: '12px' }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search City Name"
                      inputProps={{ 'aria-label': 'search city name'}}
                      name='search'
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      required
                    
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon/>
                    </IconButton>
                  </Paper>
                  </form>

                </div>
                <div className='weather-footer'>
                  Made with React Js / Rapid Api
                </div>
              </div>  

              <div className='right-side'>
                <div className='right-side-content'>
                <div className='upper-right-description'>
                  <Title level={2}>Today</Title>
                    <Card sx={{ minWidth: 175 }} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '15px'}}>
                    {error === null ? (<>
                      <CardContent>
                      <Row style={{justifyContent: 'center', display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                        <Col span={12} xs={24} sm={24} lg={12} style={{marginBottom: '10px'}}> 
                          <div className="temp_emoji">
                          <p>{data.weather[0].main}</p>
                          <span style={{fontSize: '30px'}}>{emoji}</span>
                          </div>
                          <Title level={2} style={{color: 'rgb(50,120,127)'}}>{temp} &deg;C</Title>
                         <Title variant="caption" level={5} display="block" style={{textTransform: 'uppercase'}}>{data.weather[0].description}</Title>
                          {day} , {month} {date} {year}
                          <br/>
                          {`${dateTime.toLocaleTimeString()}`}
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                          <Title variant="caption" level={5} display="block">Humidity: {humidity}%</Title>
                          <Title variant="caption" level={5} display="block">Min Temp: {temp_min} &deg;C</Title>
                          <Title variant="caption" level={5} display="block">Max Temp: {temp_max} &deg;C</Title>
                          <Title variant="caption" level={5} display="block">Wind: {wind} mph</Title>
                        </Col>
                      </Row>
                    </CardContent>
                    </>)
                    :
                    (<>
                      <CardContent>
                        <center>
                        No Data To Be Shown, Please Try Again
                        </center>
                      </CardContent>
                    </>)}
                  </Card>     
                </div>
                {error !== null && (
                  <img src={gif} alt='gif' style={{height: '60%'}}></img>
                )}
                <div className='lower-right-description'>
                  {error === null ? (<>
                    <Title level={2}>News in {data.name} {data.sys.country}</Title>
                      <News country={`${data.name}`}/>
                      </>):
                    (<>
                     <Title level={2}>News Today</Title>
                     <Card>
                     <CardContent>
                        <center>
                        No Data To Be Shown, Please Try Again
                        </center>
                      </CardContent>
                      </Card>
                    </>)}
                  
                </div>
                </div>
              </div>
            </div>
        </Box>
      </Container>
    </div>
  )
}

export default Weather