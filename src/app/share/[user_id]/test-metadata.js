// Test script to verify metadata generation
// Run this with: node test-metadata.js

import { fetchUserData } from '../../Utils/serverApi.js';

async function testMetadata() {
  const userId = 'bhoomika-ravikumar';
  
  try {
    console.log('Fetching user data for:', userId);
    const userData = await fetchUserData(userId);
    
    if (userData && userData.length > 0) {
      const user = userData[0];
      const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
      const designation = user.designation || '';
      const profileImage = user.profile_image;
      
      console.log('User Data:', {
        fullName,
        designation,
        profileImage,
        profileImageUrl: profileImage ? `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}` : null
      });
      
      console.log('\nGenerated Metadata:');
      console.log('Title:', `${fullName} | The Talent Club`);
      console.log('Description:', designation
        ? `${fullName} - ${designation}. View ${fullName}'s professional profile, experience, and connect on The Talent Club.`
        : `View ${fullName}'s professional profile and connect on The Talent Club.`);
      console.log('OG Image:', profileImage ? `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}` : 'No image');
      console.log('URL:', `https://thetalentclub.co.in/share/${userId}`);
      
    } else {
      console.log('No user data found');
    }
  } catch (error) {
    console.error('Error testing metadata:', error);
  }
}

// Uncomment to run test
// testMetadata();
