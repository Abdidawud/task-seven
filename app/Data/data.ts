
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { JobPostingbyId,JobPosting } from '../type/type'

// Define a service using a base URL and expected endpoints
export const Data = createApi({
  reducerPath: 'opportunities',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }),
  endpoints: (builder) => ({
    getData: builder.query<JobPosting, void>({
      query: () => `opportunities/search`,
    }),
    getJobPostingbyId: builder.query<JobPostingbyId, string>({
      query: (id) => `opportunities/${id}`,
  }),
})

});
export const { useGetDataQuery,useGetJobPostingbyIdQuery
 } = Data