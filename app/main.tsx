import Image from "next/image";
import Card from "./components/card";
import Jobs from "./jobs";
import Link from "next/link";
import Description from "./components/description";
import { useGetDataQuery } from "./Data/data";

const jobsData = Jobs();

export default function Home() {
  const { data, isLoading, error } = useGetDataQuery();
  console.log(data?.data);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between ml-72 mb-10 mt-10 mr-72">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-slate-800">
            Oppurtunities
          </h1>
          <p className="text-slate-400">Showing 73 results</p>
        </div>
        <div className="flex">
          <span className="text-slate-400">Sort by: </span>{" "}
          <p className="text-slate-800">Most relevant</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div>
          {data?.data.map((job, id) => (
            <Card
              key={id}
              id={job.id}
              title={job.title}
              description={job.description}
              company={job.orgName}
              location={job.location[0]}
              image={job.logoUrl}
            />
          ))}
          <Description id={"1"} />
        </div>
      </div>
    </div>
  );
}
