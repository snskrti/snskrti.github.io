// SEO configurations for all pages
export const seoConfigs = {
  // Event pages
  'holi-2025': {
    title: 'Holi 2025 - Festival of Colors | Sanskriti e.V. Hamburg',
    description: 'Join Sanskriti e.V. for the vibrant Holi 2025 celebration in Hamburg on March 14, 2025. Experience the Festival of Colors with music, dance, traditional foods, and eco-friendly colors.',
    keywords: 'Holi 2025, Festival of Colors, Hamburg, Indian festival, Sanskriti eV, Holi celebration Germany, spring festival',
    image: '/images/holi-crowd-1.jpg',
    eventDate: '2025-03-14',
    eventType: 'Cultural Festival'
  },
  
  'grill-2025': {
    title: 'Summer Grill Event 2025 | Sanskriti e.V. Hamburg',
    description: 'Join Sanskriti e.V. for the Summer Grill Event 2025 in Hamburg on August 03, 2025. Enjoy delicious food, outdoor games, music, and community bonding in a beautiful Hamburg park.',
    keywords: 'Summer Grill 2025, Hamburg, community event, Sanskriti eV, outdoor activities, cultural exchange',
    image: '/images/grill_event_banner_2025.jpeg',
    eventDate: '2025-08-03',
    eventType: 'Community Event'
  },
  
  'rakhi-2025': {
    title: 'Raksha Bandhan 2025 - Celebrating Sibling Love | Sanskriti e.V. Hamburg',
    description: 'Celebrate Raksha Bandhan 2025 with Sanskriti e.V. in Hamburg on August 03, 2025. Traditional rakhi tying ceremony, cultural activities, and family bonding events.',
    keywords: 'Raksha Bandhan 2025, Rakhi, Hamburg, Indian festival, sibling celebration, Sanskriti eV, family events',
    image: '/images/rakhi_event_banner_2025.jpg',
    eventDate: '2025-08-03',
    eventType: 'Cultural Festival'
  },
  
  'sit-and-draw-2025': {
    title: 'Sit and Draw Competition 2025 | Sanskriti e.V. Hamburg',
    description: 'Creative art competition for children in Hamburg. Sanskriti e.V. organizes the Sit and Draw Competition 2025 with themes, prizes, and fun activities for young artists.',
    keywords: 'Sit and Draw 2025, art competition, children activities, Hamburg, Sanskriti eV, creative workshop, kids events',
    image: '/images/hand-alpona.jpg',
    eventDate: '2025-10-01',
    eventType: 'Educational Event'
  },
  
  'diwali-2025': {
    title: 'Diwali 2025 - Festival of Lights | Sanskriti e.V. Hamburg',
    description: 'Celebrate Diwali 2025 with Sanskriti e.V. in Hamburg on October 20, 2025. Experience the Festival of Lights with traditional puja, cultural performances, and community celebration.',
    keywords: 'Diwali 2025, Festival of Lights, Hamburg, Indian festival, Sanskriti eV, Deepavali celebration, Hindu festival',
    image: '/images/candles-among-diwali-designs.jpg',
    eventDate: '2025-10-20',
    eventType: 'Cultural Festival'
  },
  
  // Other pages
  'sponsors-partners': {
    title: 'Sponsors & Partners | Sanskriti e.V. Hamburg',
    description: 'Meet our valued sponsors and partners who support Sanskriti e.V. in promoting Indian culture and community events in Hamburg, Germany.',
    keywords: 'Sanskriti sponsors, partners, Hamburg, Indian cultural support, community sponsors, cultural organizations',
    image: '/images/logo.png',
    type: 'website'
  },
  
  'membership-request': {
    title: 'Join Sanskriti e.V. Hamburg - Membership Application',
    description: 'Become a member of Sanskriti e.V. Hamburg and join our vibrant Indian cultural community. Apply for membership and participate in our cultural events and activities.',
    keywords: 'Sanskriti membership, join Sanskriti Hamburg, Indian cultural membership, community participation, cultural events membership',
    image: '/images/logo.png',
    type: 'website'
  }
};

// Template for adding SEO to a page
export const getSEOTemplate = (pageKey: string) => {
  const config = seoConfigs[pageKey];
  if (!config) return null;
  
  return `
import { SEOHead } from '../../components/SEO/SEOHead'; // Adjust path as needed

// Add this to your component's return statement, right after the opening div:
<SEOHead
  title="${config.title}"
  description="${config.description}"
  keywords="${config.keywords}"
  url="/${pageKey.includes('2025') ? 'events/' : ''}${pageKey}"
  type="${config.type || 'event'}"
  image="${config.image}"
  ${config.eventDate ? `eventDate="${config.eventDate}"` : ''}
  ${config.eventType ? `eventType="${config.eventType}"` : ''}
  eventLocation="Hamburg, Germany"
/>
`;
};

// Usage: console.log(getSEOTemplate('holi-2025'));
