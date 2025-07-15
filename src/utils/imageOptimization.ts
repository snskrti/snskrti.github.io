// Image optimization recommendations
export const imageOptimizations = {
  // Critical images that should be preloaded
  criticalImages: [
    '/images/logo.png',
    '/images/candles-among-diwali-designs.jpg', // Hero image
  ],
  
  // Event images with optimized alt text
  eventImages: {
    '/images/candles-among-diwali-designs.jpg': 'Diwali candles and traditional designs - Sanskriti e.V. Hamburg',
    '/images/diya-lights-bright-to-dark.jpg': 'Traditional diya lights transitioning from bright to dark - Indian festival celebration',
    '/images/fireworkds-at-side-of-hill.jpg': 'Fireworks celebration at hillside - Cultural festival Hamburg',
    '/images/hand-alpona.jpg': 'Hand-drawn alpona traditional Bengali art - Sit and Draw Competition',
    '/images/hero-image2.jpg': 'Sanskriti e.V. cultural celebration - Hamburg Indian community',
    '/images/holi-colors-hands.jpg': 'Colorful hands during Holi festival - Festival of Colors celebration',
    '/images/holi-crowd-1.jpg': 'Holi celebration crowd - Community gathering Hamburg',
    '/images/kallol_durga_idol.jpg': 'Beautiful Durga Puja idol - Bengali cultural festival Hamburg',
    '/images/lamps-cultural-event.jpg': 'Traditional lamps at cultural event - Sanskriti e.V. Hamburg',
    '/images/ma-durga-face-right.jpg': 'Maa Durga face - Sacred Hindu goddess celebration',
    '/images/maa-durga-boron-2.jpg': 'Maa Durga boron ceremony - Bengali Durga Puja ritual',
    '/images/vorstand_ladies_2.jpg': 'Sanskriti e.V. board members - Women-led organization Hamburg',
    '/images/welcome_to_club.jpg': 'Welcome to Sanskriti e.V. - Cultural club Hamburg',
    '/images/grill_event_banner_2025.jpeg': 'Summer Grill Event 2025 - Community gathering Hamburg',
    '/images/rakhi_event_banner_2025.jpg': 'Rakhi Event 2025 - Sibling celebration Hamburg',
    '/images/logo.png': 'Sanskriti e.V. Hamburg logo - Indian cultural organization'
  },
  
  // Recommended image formats and sizes
  recommendations: {
    logo: {
      formats: ['webp', 'png'],
      sizes: ['64x64', '128x128', '256x256', '512x512'],
      purpose: 'Logo and favicon'
    },
    hero: {
      formats: ['webp', 'jpg'],
      sizes: ['1920x1080', '1280x720', '768x432'],
      purpose: 'Hero/banner images'
    },
    event: {
      formats: ['webp', 'jpg'],
      sizes: ['800x600', '400x300', '200x150'],
      purpose: 'Event cards and thumbnails'
    }
  }
};

// Generate optimized image component
export const generateOptimizedImage = (src: string, alt: string, className?: string) => {
  const optimizedAlt = imageOptimizations.eventImages[src] || alt;
  
  return {
    src,
    alt: optimizedAlt,
    className,
    loading: imageOptimizations.criticalImages.includes(src) ? 'eager' : 'lazy',
    decoding: 'async'
  };
};
