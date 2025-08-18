"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const GetUserDetails = () => {
    const params = useParams();
  const userid = params?.userid || 3; // fallback to 1 if missing
  const [prodata, setProData] = useState(null);

  async function userdetailsget() {
    try {
      const res = await axios.post(
        "https://nodejs.thetalentclub.co.in/user_detail_get",
        { user_id: userid }
      );
      setProData(res.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  }

  useEffect(() => {
    if (userid) {
      userdetailsget();
    }
  }, [userid]);
  return (
    <div>GetUserDetails</div>
  )
}

export default GetUserDetails