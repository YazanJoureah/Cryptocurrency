import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaaders = {
  "X-Api-Key": "c92e25773fb640afad160a243d71bbe2",
};
const baseUrl = "https://newsapi.org/v2/";
const createRequest = (url) => ({ url, headers: cryptoNewsHeaaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/everything?q=${newsCategory}&pageSize=${count}&sortBy= publishedAt`
        ),
    }),

    getCryptoHeadlines: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/top-headlines?q=crypto&$category=${newsCategory}&pageSize=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery, useGetCryptoHeadlinesQuery } =
  cryptoNewsApi;
