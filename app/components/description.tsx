import React from "react";
import Image from "next/image";
import { useGetJobPostingbyIdQuery } from "../Data/data";

const Description = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetJobPostingbyIdQuery(id);
  console.log(data);
  const job = data?.data;
  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div className="rounded p-5 bg-yellow-300 border">Loading...</div>;
  }

  return (
    <div className="flex ml-16">
      <div className="flex-shrink max-w-4xl my-10 mx-5">
        <div className="my-3">
          <h1 className="font-poppins text-3xl font-bold text-slate-800">
            Description
          </h1>
          <h3 className="py-2 font-medium text-justify text-slate-800 font-epilogue">
            {job?.description}
          </h3>
        </div>
        <div className="my-3">
          <h1 className="font-poppins text-3xl font-bold text-slate-800 mb-3">
            Responsibilities
          </h1>
          <ul>
            {job?.responsibilities.split("\n").map((responsibility, index) => (
              <li key={index} className="flex my-1.5 text-slate-800">
                <Image
                  src={"/assets/checkboxIcon.png"}
                  width={25}
                  height={20}
                  alt="check"
                  className="mr-2"
                />
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h1 className="font-poppins text-3xl font-bold text-slate-800 my-5">
            Ideal Candidate we want
          </h1>
          <ul>
            {/* {job?.idealCandidate.map((trait, index) => ( */}
            <li className="items-center my-1 space-x-1 text-slate-800 decoration-clone">
              {" "}
              <span className="text-2xl mr-2">&#183;</span>
              {job?.idealCandidate}
            </li>
            {/* ))} */}
          </ul>
        </div>

        <div className="my-3">
          <h1 className="font-poppins text-3xl font-bold text-slate-800 mb-5">
            {" "}
            When and Where
          </h1>
          <div className="flex">
            <Image
              src="/assets/location.png"
              width={20}
              height={20}
              alt="location"
            />
            <h3 className="ml-3 inline-block text-slate-800">
              {job?.whenAndWhere}
            </h3>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h1 className="font-poppins text-3xl font-bold text-slate-800">
              About
            </h1>
            <div className="flex items-center my-2">
              <div className="mr-3 flex-shrink-0">
                <Image
                  src="/assets/circleplus.png"
                  width={30}
                  height={30}
                  alt="icon"
                />
              </div>
              <div>
                <p className="text-slate-400 font-epilogue">Posted On</p>
                <p className="text-slate-800 font-epilogue">
                  {job?.datePosted}
                </p>
              </div>
            </div>
            <div className="flex items-center my-2">
              <div className="mr-3 flex-shrink-0">
                <Image
                  src="/assets/image.png"
                  width={30}
                  height={30}
                  alt="icon"
                />
              </div>
              <div>
                <p className="text-slate-400 font-epilogue">Deadline</p>
                <p className="text-slate-800 font-epilogue">{job?.deadline}</p>
              </div>
            </div>
            <div className="flex items-center my-2">
              <div className="mr-3 flex-shrink-0">
                <Image
                  src="/assets/location.png"
                  width={30}
                  height={30}
                  alt="icon"
                />
              </div>
              <div>
                <p className="text-slate-400 font-epilogue">Location</p>
                <p className="text-slate-800 font-epilogue">{job?.location}</p>
              </div>
            </div>
            <div className="flex items-center my-2">
              <div className="mr-3 flex-shrink-0">
                <Image
                  src="/assets/calendar.png"
                  width={30}
                  height={30}
                  alt="icon"
                />
              </div>
              <div>
                <p className="text-slate-400 font-epilogue">Start Date</p>
                <p className="text-slate-800 font-epilogue">{job?.startDate}</p>
              </div>
            </div>
            <div className="flex items-center my-2">
              <div className="mr-3 flex-shrink-0">
                <Image
                  src="/assets/checkcalendar.png"
                  width={30}
                  height={30}
                  alt="icon"
                />
              </div>
              <div>
                <p className="text-slate-400 font-epilogue">End Date</p>
                <p className="text-slate-800 font-epilogue">{job?.endDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-poppins text-3xl font-bold text-slate-800 my-3">
            Categories
          </h1>
          <div>
            {job?.categories.map((value, index) => (
              <>
                <button className="bg-orange-200 text-orange-400  py-2 px-4 rounded-3xl mr-3 h-10 my-2">
                  {value}
                </button>
              </>
            ))}
            {/* <button className="bg-green-200 text-green-400  py-2 px-4 rounded-3xl mx-2 h-10">
              {data?.about.categories[1]}
            </button> */}
          </div>
        </div>
        <div>
          <h1 className="font-poppins text-3xl font-bold text-slate-800">
            Required Skills
          </h1>
          <div>
            {job?.requiredSkills.map((responsibility, index) => (
              <button
                className="bg-gray-200 text-purple-800 mr-2 mt-2 py-2 px-4 rounded inline-flex items-center "
                key={index}
              >
                {responsibility}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
