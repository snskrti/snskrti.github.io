export interface Event {
    title: string;
    date: string;
    description: string;
    image: string;
    link: string;
}

export const events: Event[] = [
    {
      title: "Rakhi",
      date: "August 03, 2025",
      description: "Rakhi Celebration",
      image: "/images/rakhi-event-banner-2025.jpg",
      link: "/events/rakhi-2025"
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
