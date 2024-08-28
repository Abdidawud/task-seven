"use client";

import { useEffect, useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useSession } from "next-auth/react"; // Import useSession hook

interface AddProps {
  id: string;
}

export default function Add({ id }: AddProps) {
  const { data: session } = useSession(); // Access the session data
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!session) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const response = await fetch(
          `https://akil-backend.onrender.com/bookmarks/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.accessToken}`, // Include the token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookmark status");
        }

        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    fetchBookmarkStatus();
  }, [id, session]);

  const toggleBookmark = async () => {
    if (!session) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const method = isBookmarked ? "DELETE" : "POST";
      const response = await fetch(
        `https://akil-backend.onrender.com/bookmarks/${id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${session?.user}`, // Include the token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error("Failed to toggle bookmark");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div>
      {isBookmarked ? (
        <IoBookmark
          className="text-yellow-500 cursor-pointer"
          onClick={toggleBookmark}
        />
      ) : (
        <IoBookmarkOutline
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleBookmark}
        />
      )}
    </div>
  );
}
