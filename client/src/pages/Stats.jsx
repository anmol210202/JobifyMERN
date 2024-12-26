import { useQuery } from "@tanstack/react-query";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
// import { useLoaderData } from "react-router-dom";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {  // passing queryClient to the loader in func to func
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
  // const response = await customFetch.get("/jobs/stats");
  // console.log(response.data);
  // return response.data;
  //  we use errorElement here to show error in dashboard status only....from app.jsx
  // try {
  //   const response = await customFetch.get("/jobs/stats");
  //   // console.log(response.data);
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }
};

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();
  // console.log(defaultStats);
  const { data } = useQuery(statsQuery);
  // console.log(data);
  // if (isLoading) {
  //   return <h1>Loading....</h1>;
  // }
  // if (isError) {
  //   return <h1>Error....</h1>;
  // }
  const { defaultStats, monthlyApplications } = data;

  // return <h1>react query </h1>;
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
