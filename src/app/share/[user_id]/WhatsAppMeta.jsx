'use client';

import { useEffect } from 'react';

export default function WhatsAppMeta({ userData, userId }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && userData && userData.length > 0) {
      const user = userData[0];
      const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
      const designation = user.designation || '';
      const profileImage = user.profile_image;
      const address = user.address || '';
      
      // Ensure profile image URL is absolute and accessible
      const profileImageUrl = profileImage 
        ? `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}`
        : 'https://thetalentclub.co.in/whitelogo.png';

      const description = designation
        ? `${fullName} - ${designation}${address ? ` from ${address}` : ''}. View ${fullName}'s professional profile, experience, and connect on The Talent Club.`
        : `View ${fullName}'s professional profile and connect on The Talent Club.`;
      
      // Update or create meta tags for WhatsApp sharing
      const updateMetaTag = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      const updatePropertyTag = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      // Basic meta tags
      updateMetaTag('title', fullName ? `${fullName} | The Talent Club` : "Professional Profile | The Talent Club");
      updateMetaTag('description', description);

      // Open Graph tags (WhatsApp uses these)
      updatePropertyTag('og:title', `${fullName} | The Talent Club`);
      updatePropertyTag('og:description', description);
      updatePropertyTag('og:type', 'profile');
      updatePropertyTag('og:url', `https://thetalentclub.co.in/share/${userId}`);
      updatePropertyTag('og:site_name', 'The Talent Club');
      updatePropertyTag('og:locale', 'en_US');

      // Profile image for WhatsApp - ensure it's always present
      updatePropertyTag('og:image', profileImageUrl);
      updatePropertyTag('og:image:width', '400');
      updatePropertyTag('og:image:height', '400');
      updatePropertyTag('og:image:type', 'image/png');
      updatePropertyTag('og:image:alt', `${fullName}'s profile picture`);
      updatePropertyTag('og:image:secure_url', profileImageUrl);

      // Twitter Card tags
      updatePropertyTag('twitter:card', 'summary_large_image');
      updatePropertyTag('twitter:title', `${fullName} | The Talent Club`);
      updatePropertyTag('twitter:description', description);
      updatePropertyTag('twitter:image', profileImageUrl);
      updatePropertyTag('twitter:creator', '@thetalentclub');
      updatePropertyTag('twitter:site', '@thetalentclub');

      // WhatsApp specific tags
      updateMetaTag('whatsapp-meta', 'true');
      
      // Additional WhatsApp optimization tags
      updatePropertyTag('og:image:url', profileImageUrl);
      updatePropertyTag('og:image:secure_url', profileImageUrl);
      
      // Ensure the page title is also updated
      if (document.title !== `${fullName} | The Talent Club`) {
        document.title = `${fullName} | The Talent Club`;
      }
    }
  }, [userData, userId]);

  return null; // This component doesn't render anything
}
