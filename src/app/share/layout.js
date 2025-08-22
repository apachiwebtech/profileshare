export const metadata = {
  title: "Share Profile - The Talent Club",
  description: "View and share professional profiles on The Talent Club. Connect with professionals, view their posts, and expand your network.",
  keywords: "profile sharing, professional network, posts, social media, networking, professionals",
  robots: 'index, follow',
  openGraph: {
    title: "Share Profile - The Talent Club",
    description: "View and share professional profiles on The Talent Club. Connect with professionals, view their posts, and expand your network.",
    type: 'website',
    siteName: 'The Talent Club',
  },
  twitter: {
    card: 'summary',
    title: "Share Profile - The Talent Club",
    description: "View and share professional profiles on The Talent Club",
    creator: '@thetalentclub',
    site: '@thetalentclub',
  },
};

export default function Layout({ children }) {
  return children;
}
