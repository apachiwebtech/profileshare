// Server-side API utility functions
// These functions run on the server and can be used in Server Components

import axios from "axios";

const BASE_URL = "https://nodejs.thetalentclub.co.in";

export async function fetchUserData(userId) {
  try {
    const response = await axios.post(
      `${BASE_URL}/user_detail_get`,
      { user_id: userId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export async function fetchUserPosts(userId) {
  try {
    const response = await fetch(`${BASE_URL}/shared_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

        return await response.json();
  } catch (error) {
        console.error('Error fetching user posts:', error);
        return null;
  }
}

// Example of how to use these in a Server Component:
/*
import { fetchUserData, fetchUserPosts } from './Utils/serverApi';

const Page = async ({ searchParams }) => {
  const userId = searchParams?.user_slug;
  
  // Fetch data on the server
  const userData = await fetchUserData(userId);
  const userPosts = await fetchUserPosts(userId);
  
  return (
    <div>
      <UserProfile userData={userData} userId={userId} />
      <UserPosts posts={userPosts} userId={userId} />
    </div>
  );
};
*/ 