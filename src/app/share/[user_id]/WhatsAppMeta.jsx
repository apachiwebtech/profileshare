'use client';

import { useEffect } from 'react';

export default function WhatsAppMeta({ userData, userId }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && userData && userData.length > 0) {
      const user = userData[0];
      const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
      const designation = user.designation || '';
      const profileImage = user.profile_image;
      
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
      updateMetaTag('description', designation
        ? `${fullName} - ${designation}. View ${fullName}'s professional profile, experience, and connect on The Talent Club.`
        : `View ${fullName}'s professional profile and connect on The Talent Club.`);

      // Open Graph tags (WhatsApp uses these)
      updatePropertyTag('og:title', `${fullName} | The Talent Club`);
      updatePropertyTag('og:description', designation
        ? `${fullName} - ${designation}. View ${fullName}'s professional profile, experience, and connect on The Talent Club.`
        : `View ${fullName}'s professional profile and connect on The Talent Club.`);
      updatePropertyTag('og:type', 'profile');
      updatePropertyTag('og:url', `https://thetalentclub.co.in/share/${userId}`);
      updatePropertyTag('og:site_name', 'The Talent Club');
      updatePropertyTag('og:locale', 'en_US');

      // Profile image for WhatsApp
      if (profileImage) {
        updatePropertyTag('og:image', `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}`);
        updatePropertyTag('og:image:width', '400');
        updatePropertyTag('og:image:height', '400');
        updatePropertyTag('og:image:type', 'image/png');
        updatePropertyTag('og:image:alt', `${fullName}'s profile picture`);
      }

      // Twitter Card tags
      updatePropertyTag('twitter:card', 'summary_large_image');
      updatePropertyTag('twitter:title', `${fullName} | The Talent Club`);
      updatePropertyTag('twitter:description', designation
        ? `${fullName} - ${designation}. View ${fullName}'s professional profile, experience, and connect on The Talent Club.`
        : `View ${fullName}'s professional profile and connect on The Talent Club.`);
      if (profileImage) {
        updatePropertyTag('twitter:image', `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}`);
      }
      updatePropertyTag('twitter:creator', '@thetalentclub');
      updatePropertyTag('twitter:site', '@thetalentclub');

      // WhatsApp specific tags
      updateMetaTag('whatsapp-meta', 'true');
      updatePropertyTag('og:image:secure_url', profileImage ? `https://nodejs.thetalentclub.co.in/upload/profile/${profileImage}` : '');
    }
  }, [userData, userId]);

  return null; // This component doesn't render anything
}
