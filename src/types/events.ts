export interface Event {
    title: string;
    date: string;
    description: string;
    image: string;
    link: string;
}

export const events: Event[] = [
    {
      title: "Summer Grill 2025",
      date: "August 03, 2025",
      description: "Summer Grill Event in Hamburg",
      image: "/images/grill_event_banner_2025.jpeg",
      link: "/events/grill-2025"
    },
    {
      title: "Rakhi",
      date: "August 03, 2025",
      description: "Rakhi Celebration",
      image: "/images/rakhi_event_banner_2025.jpg",
      link: "/events/rakhi-2025"
    },
    {
      title: "Durga Puja",
      date: "Sep 28 - Oct 02, 2025",
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