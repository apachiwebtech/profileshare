import { fetchUserData } from '../../Utils/serverApi';

// Generate metadata dynamically for each user_id
export async function generateMetadata({ params }) {
  const userId = params.user_id;

  try {
    const userData = await fetchUserData(userId);

    if (userData && userData.length > 0) {
      const user = userData[0];
      const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
      const designation = user.designation || '';
      const profileImage = user.profile_image;
      const address = user.address || '';

      // Build keywords from user data
      const keywords = [
        fullName,
        designation,
        'profile',
        'professional',
        'The Talent Club',
        address
      ].filter(Boolean).join(', ');

      // Ensure profile image URL is absolute and accessible
      const profileImageUrl = profileImage 
        ? `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}`
        : 'https://thetalentclub.co.in/whitelogo.png';

      const description = designation
        ? `${fullName} - ${designation}${address ? ` from ${address}` : ''}. View ${fullName}'s professional profile, experience, and connect on The Talent Club.`
        : `View ${fullName}'s professional profile and connect on The Talent Club.`;

      return {
        title: fullName ? `${fullName} | The Talent Club` : "Professional Profile | The Talent Club",
        description,
        keywords,
        openGraph: {
          title: `${fullName} | The Talent Club`,
          description,
          type: 'profile',
          url: `https://thetalentclub.co.in/share/${userId}`,
          siteName: 'The Talent Club',
          images: [
            {
              url: profileImageUrl,
              width: 400,
              height: 400,
              alt: `${fullName}'s profile picture`,
              type: 'image/png',
              secureUrl: profileImageUrl
            }
          ],
          locale: 'en_US',
        },
        twitter: {
          card: 'summary_large_image',
          title: `${fullName} | The Talent Club`,
          description,
          images: [profileImageUrl],
          creator: '@thetalentclub',
          site: '@thetalentclub',
        },
        alternates: {
          canonical: `https://thetalentclub.co.in/share/${userId}`,
        },
        robots: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
        verification: {
          google: 'your-google-verification-code',
        },
        other: {
          'whatsapp-meta': 'true',
          'og:image:secure_url': profileImageUrl,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata if user data is not available or there's an error
  return {
    title: "Professional Profile | The Talent Club",
    description: "Discover professional profiles and connect with talented individuals on The Talent Club.",
    keywords: "professional profile, networking, talent, careers, professionals, The Talent Club",
    openGraph: {
      title: "Professional Profile | The Talent Club",
      description: "Discover professional profiles and connect with talented individuals on The Talent Club.",
      type: 'website',
      siteName: 'The Talent Club',
      url: `https://thetalentclub.co.in/share/${userId}`,
      images: [
        {
          url: 'https://thetalentclub.co.in/whitelogo.png',
          width: 400,
          height: 400,
          alt: 'The Talent Club Logo',
          type: 'image/png',
          secureUrl: 'https://thetalentclub.co.in/whitelogo.png'
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Professional Profile | The Talent Club",
      description: "Discover professional profiles and connect with talented individuals on The Talent Club.",
      images: ['https://thetalentclub.co.in/whitelogo.png'],
      creator: '@thetalentclub',
      site: '@thetalentclub',
    },
    alternates: {
      canonical: `https://thetalentclub.co.in/share/${userId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'whatsapp-meta': 'true',
      'og:image:secure_url': 'https://thetalentclub.co.in/whitelogo.png',
    },
  };
}

// For static generation, list the user IDs you want to pre-render
// This is only needed when using output: 'export'
export async function generateStaticParams() {
  // If you're not using static export, you can return an empty array
  // or comment out this function entirely
  
  // List of user IDs that should be pre-generated
  // Add all user IDs that you want to support in static generation
  const userIds = [
    'bhoomika-ravikumar',
    'sagar-koparkar',
    // Add more user IDs here as needed
    // You can also fetch this list from your API if needed
  ];
  
  // Pre-fetch data for each user to validate the IDs and ensure data exists
  const validUserIds = await Promise.all(
    userIds.map(async (id) => {
      try {
        const data = await fetchUserData(id);
        // Return the ID even if API fails, to avoid build errors
        // The page will handle missing data gracefully
        return { user_id: id };
      } catch (error) {
        console.error(`Error fetching data for user ${id}:`, error);
        // Return the ID even if API fails, to avoid build errors
        return { user_id: id };
      }
    })
  );

  return validUserIds.filter(Boolean);
}

import { Suspense } from 'react';
import ShareHeader from '../../ShareHeader';
import RandomeUser from "../../RandomeUser";
import ProfileDetailCard from "../../profiledetailcard/ProfileDetailCard";
import WhatsAppMeta from './WhatsAppMeta';
import ShareButton from './ShareButton';

export default async function Page({ params }) {
  // Fetch data at render time
  const userData = await fetchUserData(params.user_id);
  
  // Extract user name for sharing
  const userName = userData && userData.length > 0 
    ? `${userData[0].firstname || ''} ${userData[0].lastname || ''}`.trim()
    : 'Professional Profile';
  
  return (
    <>
      <WhatsAppMeta userData={userData} userId={params.user_id} />
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
        <main>
          <div className="main-section">
            <div className="container">
              <div className="main-section-data">
                <div className="row">
                  <div className="col-lg-3 col-md-4 pd-left-none no-pd" id="left-section">
                    <div className="main-left-sidebar no-margin">
                      <RandomeUser userId={params.user_id} initialData={userData} />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-8 no-pd" id="mid-section">
                    <div className="main-ws-sec">
                      <ProfileDetailCard userId={params.user_id} />
                      <ShareButton userId={params.user_id} userName={userName} />
                    </div>
                  </div>

                  <div className="col-lg-3 pd-right-none no-pd" id="right-section">
                    <div className="right-sidebar">
                      {/* <Footer /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Suspense>
    </>
  );
}
