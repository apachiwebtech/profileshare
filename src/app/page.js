import RandomeUser from "./RandomeUser";
import ProfileDetailCard from "./profiledetailcard/ProfileDetailCard";
import ShareHeader from "./ShareHeader";
import Link from 'next/link';
import { fetchUserData } from './Utils/serverApi';

// This is a Server Component that reads search params on the server
// Child components remain Client Components for interactivity (likes, comments, etc.)
const Page = async ({ searchParams }) => {
  const userId = searchParams?.user_slug;

  // Fetch user data on the server for metadata
  const userData = await fetchUserData(userId);

  return (
    <>
      <ShareHeader />

      <main>
        <div className="main-section">
          <div className="container">
            <div className="main-section-data">
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Generate dynamic metadata based on user data
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const userId = params?.user_slug;

  try {
    const userData = await fetchUserData(userId);

    if (userData && userData.length > 0) {
      const user = userData[0]; // Assuming the API returns an array
      const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
      const designation = user.designation || '';
      const profileImage = user.profile_image;

      // Clean up keywords by removing empty values and duplicates
      const keywords = [fullName, designation, 'profile', 'posts', 'social media', 'network']
        .filter(Boolean)
        .join(', ');

      const title = fullName ? `${fullName} - Profile` : "User Profile";
      const description = designation
        ? `${fullName} - ${designation}. View profile, posts, and more.`
        : `${fullName} - View profile, posts, and more.`;

      return {
        title,
        description,
        keywords,
        authors: [{ name: fullName }],
        creator: fullName,
        publisher: 'The Talent Club',
        robots: 'index, follow',
        openGraph: {
          title,
          description,
          type: 'profile',
          url: `https://yoursite.com/?user_slug=${userId}`,
          siteName: 'The Talent Club',
          images: profileImage
            ? [{
              url: `https://thetalentclub.co.in/upload/profile/${profileImage}`,
              width: 400,
              height: 400,
              alt: `${fullName}'s profile picture`
            }]
            : [],
          locale: 'en_US',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: profileImage
            ? [`https://thetalentclub.co.in/upload/profile/${profileImage}`]
            : [],
          creator: '@thetalentclub',
          site: '@thetalentclub',
        },
        alternates: {
          canonical: `https://yoursite.com/?user_slug=${userId}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata if user data is not available
  return {
    title: "User Profile - The Talent Club",
    description: "View user profile, posts, and connect with professionals on The Talent Club.",
    keywords: "profile, posts, social media, networking, professionals",
    robots: 'index, follow',
    openGraph: {
      title: "User Profile - The Talent Club",
      description: "View user profile, posts, and connect with professionals on The Talent Club.",
      type: 'website',
      siteName: 'The Talent Club',
    },
    twitter: {
      card: 'summary',
      title: "User Profile - The Talent Club",
      description: "View user profile, posts, and connect with professionals on The Talent Club.",
    },
  };
}

export default Page;
