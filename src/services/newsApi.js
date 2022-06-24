import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const newsHeader = {
      'X-BingApis-SDK': 'true',
      "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API,
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';


const createRequest = (url) => ({url , headers: newsHeader});

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({country}) => createRequest(`/news/search?q=Country ${country}&safeSearch=Off&textFormat=Raw&freshness=Day&sortBy=Date`),
        })
    })
})

export const {useGetNewsQuery} = newsApi;