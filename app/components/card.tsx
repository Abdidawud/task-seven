import React from "react";
import Image from "next/image";

interface cardProps {
  title: string;
  description: string;
  company: string;
  location: string;
  image: string;
}

const Card = ({ title, description, company, location }: cardProps) => {
  return (
    <div className="px-5 py-3 flex bg-white text-slate-800 border-2 my-3 rounded-[30px] ">
      <div className="mr-3">
        <Image src="/assets/logo.png" width={66} height={59} alt="logo" />
      </div>
      <div className="max-w-3xl">
        <div>
          <h3 className="text-slate-800 font-semibold  text-xl mb-2 font-epilogue">
            {title}
          </h3>
        </div>

        <div className="text-slate-500 text-base font-normal my-2 flex">
          <span className="mr-2">{company}</span>{" "}
          <span className="mr-2 text-xl">&#183;</span>
          <span>{location}</span>
        </div>

        <p className="yext-slate-700 text-justify my-2">{description}</p>
        <div className="flex">
          <button className=" bg-green-100  text-green-600  px-2 py-2 rounded-[80px] mx-2">
            In Person
          </button>
          <button className="bg-transparent  text-yellow-400   py-2 px-2 border border-yellow-400  rounded-[80px] mx-2">
            Education
          </button>
          <button className="min-w-16 bg-transparent  text-purple-800   py-2 px-2 border border-purple-800  rounded-[80px] mx-2">
            IT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
