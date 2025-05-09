import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const startTime = performance.now();
    const rawBaseQuery = fetchBaseQuery({ baseUrl: '/' });
    const result = await rawBaseQuery(args, api, extraOptions);
    const endTime = performance.now();
    const elapsed = (endTime - startTime).toFixed(2);
    console.log(`⏱ RTK Query: ${args.url} took ${elapsed} ms`);
    return result;
  },
  endpoints: (builder) => ({
    submitForm: builder.mutation({
      query: (formData) => ({
        url: 'submissions',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitFormMutation } = apiSlice;
