"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import img from "../../images/userimg.jpg"; // fallback image
import { useParams } from "next/navigation"; // Next.js way
import { BASE_URL as DEFAULT_BASE_URL } from "../../Utils/Base_Url";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const RandomUserProfile = () => {
  const [prodata, setProData] = useState([]);
  const params = useParams();
  const userid = params?.userid;

  async function userdetailsget() {
    try {
      const res = await axios.post(`${BASE_URL}/user_detail_get`, {
        user_id: userid,
      });
      setProData(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }

  useEffect(() => {
    if (userid) {
      userdetailsget();
    }
  }, [userid]);

  return (
    <>
      {prodata.map((item, index) => (
        <div className="user-data full-width" key={index}>
          <div className="user-profile">
            <div className="username-dt">
              <div className="usr-pic">
                <Image
                  src={
                    item.profile_image
                      ? `https://thetalentclub.co.in/upload/profile/${item.profile_image}`
                      : img
                  }
                  alt="profile"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div className="user-specs">
              <h3>
                {item.firstname} {item.lastname}
              </h3>
              <span>{item.designation}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RandomUserProfile;
