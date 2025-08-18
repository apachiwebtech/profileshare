"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import img from './images/userimg.jpg'
import axios from 'axios'
import { BASE_URL } from './Utils/Base_Url'

const RandomeUser = ({ userId, initialData }) => {


	console.log("userId", userId);
    const [prodata, setProData] = useState(initialData || []);
    const userid = userId || 'bhoomika-ravikumar';
  
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
      // Only fetch if we don't have initial data or if userId changed
    //   if (!initialData && userid) {
        userdetailsget();
    //   }
    }, [userid, initialData]);


	return (
		<div>
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
		</div>
	)
}

export default RandomeUser