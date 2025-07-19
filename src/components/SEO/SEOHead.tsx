import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'event';
  datePublished?: string;
  dateModified?: string;
  author?: string;
  eventStartDate?: string;
  eventLocation?: string;
  eventType?: string;
  performer?: string;
  eventEndDate?: string;
  offers?: {
    price?: string;
    currency?: string;
    availability?: string;
    url?: string;
    validFrom?: string;
    availabilityEnds?: string;
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  datePublished,
  dateModified,
  author = 'Sanskriti e.V.',
  eventStartDate,
  eventLocation = 'Hamburg, Germany',
  eventType,
  performer,
  eventEndDate,
  offers
}) => {
  const siteUrl = 'https://sanskriti-hamburg.de';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullTitle = title.includes('Sanskriti') ? title : `${title} | Sanskriti e.V. Hamburg`;

  // Generate structured data based on type
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'event' ? 'Event' : 'Organization',
      name: type === 'event' ? title : 'Sanskriti e.V.',
      description,
      url: fullUrl,
      image: fullImageUrl,
    };

    if (type === 'event' && eventStartDate) {
      const eventData: any = {
        ...baseData,
        '@type': 'Event',
        startDate: eventStartDate,
        location: {
          '@type': 'Place',
          name: eventLocation,
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Hamburg',
            addressLocality: 'Hamburg',
            addressCountry: 'DE'
          }
        },
        organizer: {
          '@type': 'Organization',
          name: 'Sanskriti e.V.',
          url: siteUrl
        },
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled'
      };

      // Add end date if provided
      if (eventEndDate) {
        eventData.endDate = eventEndDate;
      }

      // Add performer if provided
      if (performer) {
        eventData.performer = {
          '@type': 'Organization',
          name: performer
        };
      }

      // Add offers if provided
      if (offers) {
        eventData.offers = {
          '@type': 'Offer',
          price: offers.price || '0',
          priceCurrency: offers.currency || 'EUR',
          availability: offers.availability || 'https://schema.org/InStock',
          url: offers.url || fullUrl,
          validFrom: offers.validFrom || eventStartDate,
          availabilityEnds: offers.availabilityEnds || eventEndDate
        };
      }

      return eventData;
    }

    if (type === 'website' || type === 'article') {
      return {
        ...baseData,
        '@type': 'Organization',
        name: 'Sanskriti e.V.',
        alternateName: 'Sanskriti Hamburg',
        url: siteUrl,
        logo: `${siteUrl}/images/logo.png`,
        sameAs: [
          'https://www.facebook.com/profile.php?id=61573798568184',
          'https://www.youtube.com/@SanskritiHamburg'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Hamburg',
          addressCountry: 'Germany'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'admin@sanskriti-hamburg.de',
          contactType: 'customer service'
        },
        foundingDate: '2024',
        memberOf: {
          '@type': 'Organization',
          name: 'Registered Non-Profit Organizations Germany'
        }
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      
      {/* Additional Open Graph tags for better social media sharing */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Sanskriti e.V. Hamburg" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Article specific tags */}
      {type === 'article' && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {type === 'article' && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Additional SEO tags */}
      <meta name="theme-color" content="#005F73" />
      <meta name="msapplication-TileColor" content="#005F73" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
};
