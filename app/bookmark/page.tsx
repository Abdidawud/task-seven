"use client";

import { useEffect, useState } from "react";
import Card from "../components/card";
import Description from "../components/description";

interface Job {
  id: string;
  title: string;
  description: string;
  orgName: string;
  location: string[];
  logoUrl: string;
}

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://akil-backend.onrender.com/bookmarks"
        );
        console.log("response: ", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobs(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex justify-center">
      <div>
        {jobs.map((job) => (
          <Card
            key={job.id}
            id={job.id}
            title={job.title}
            description={job.description}
            company={job.orgName}
            location={job.location[0]}
            image={job.logoUrl}
          />
        ))}
        <Description id="1" />
      </div>
    </div>
  );
}
