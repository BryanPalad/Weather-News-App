import React, {useState, useEffect} from 'react'
import axios from 'axios'
import newsImage from '../assets/image/defaultNewsImage.jpg';
import {Typography, Row, Card } from 'antd';
import moment from 'moment';
const { Title } = Typography;

const News = ({country}) => {
  const defaultImage = newsImage;
  const [news, setNews] = useState([]);
  const options = {
      method: 'GET',
      url: `https://bing-news-search1.p.rapidapi.com/news/search?q=Country ${country}`,
      params: {safeSearch: 'Off', textFormat: 'Raw'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API,
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      }
    };
useEffect(() => {
  axios.request(options).then(function (response) {
      const result = (response.data.value);
      setNews(result);
  }).catch(function (error) {
      console.error(error);
  });
},[country])

  return (
    <div>
        {news.map((item, index) => {
            return <>
            <Row style={{marginBottom: '20px'}}>
            <div className='overflow-hidden'>
            <a href={item?.url} target="_blank" rel='noreferrer' key={index}>
            <Card hoverable className='news-card'>
                <Title level={5}>{item.name}</Title>
                <div className='news-description'>
                <img src={item?.image?.thumbnail?.contentUrl || defaultImage } style={{width: '150px', height: '150px'}} alt='news-img'/>
                <p>{item.description}</p>
                </div>
            <div className='news-footer'>
            <div className='news-footer-group'>
            <img src={item?.provider[0]?.image?.thumbnail?.contentUrl || defaultImage} style={{width: '50px', height: '50px'}}alt='povider-img'/>
            <p>{item?.provider[0]?.name}</p>
            </div>
            <p>{moment(item?.datePublished).fromNow()}</p>
            </div>
            
            </Card> 
            </a>
            </div>
            </Row>
            </>
        })}
    </div>
  )
}

export default News