import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaaders = {
  "X-RapidAPI-Key": "6481d95127mshe4bdf208af975b4p1a333ejsn10c14fc0e1a4",
  "X-RapidAPI-Host": "google-web-search1.p.rapidapi.com",
};

const baseUrl = "https://google-web-search1.p.rapidapi.com/";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `?query=${newsCategory}&limit=${count}&related_keywords= true`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
