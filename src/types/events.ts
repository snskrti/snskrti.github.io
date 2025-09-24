export interface Event {
    title: string;
    date: string;
    description: string;
    image: string;
    link: string;
}

export interface SpecialAnnouncement {
    title: string;
    description: string;
    image?: string;
    link?: string;
    buttonText?: string;
}

export const specialAnnouncements: SpecialAnnouncement[] = [
    {
      title: "Aboho Sangeet Release",
      description: "We are proud to announce the release of our own Aboho Sangeet for Durga Puja 2025. Listen to the melodious rendition celebrating the arrival of Maa Durga.",
      link: "/events/durga-puja-2025/aboho-sangeet",
      buttonText: "Listen Now"
    },
    {
      title: "Durga Puja Theme Song",
      description: "Our official theme song for Durga Puja 2025 is now available! Experience the spiritual journey through music as we prepare to welcome Maa Durga.",
      link: "/events/durga-puja-2025/theme-song",
      buttonText: "Listen to Theme Song"
    }
];

export const upcomingEvents: Event[] = [
    {
      title: "Mahalaya",
      date: "September 21, 2025",
      description: "Mahalaya Celebration",
      image: "/images/durga-puja-announcement-2025/mahalaya_banner.jpg",
      link: "/events/mahalaya-2025"
    },
    {
      title: "Durga Puja",
      date: "Sep 28 - Oct 01, 2025",
      description: "Annual Durga Puja Festival",
      image: "/images/ma-durga-face-right.jpg",
      link: "/events/durga-puja-2025"
    },
    {
      title: "Diwali",
      date: "Oct 20, 2025",
      description: "Diwali 2025 Celebration",
      image: "/images/candles-among-diwali-designs.jpg",
      link: "/events/diwali-2025"
    }
  ];

  export const pastEvents: Event[] = [
    
  ];