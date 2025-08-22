'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RandomeUser from "../RandomeUser";
import ProfileDetailCard from "../profiledetailcard/ProfileDetailCard";
import ShareHeader from "../ShareHeader";
import Link from 'next/link';
import { fetchUserData } from '../Utils/serverApi';

const UserProfile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('user_id');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        try {
          const data = await fetchUserData(userId);
          setUserData(data);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  return (
    <main>
      <div className="main-section">
        <div className="container">
          <div className="main-section-data">
            {loading ? (
              <div className="text-center p-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-3 col-md-4 pd-left-none no-pd" id="left-section">
                  <div className="main-left-sidebar no-margin">
                    <RandomeUser userId={userId} initialData={userData} />
                  </div>
                </div>

                <div className="col-lg-6 col-md-8 no-pd" id="mid-section">
                  <div className="main-ws-sec">
                    <ProfileDetailCard userId={userId} />
                  </div>
                </div>

                <div className="col-lg-3 pd-right-none no-pd" id="right-section">
                  <div className="right-sidebar">
                    {/* <Footer /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const Page = () => {

  return (
    <>
      <ShareHeader />
      <Suspense
        fallback={
          <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <UserProfile />
      </Suspense>
    </>
  );
};

export default Page;
