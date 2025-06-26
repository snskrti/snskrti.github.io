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
      date: "August, 2025",
      description: "Summer Grill Event in Hamburg",
      image: "/images/grill_event_banner_2025.jpeg",
      link: "/events/grill-2025"
    },
    {
      title: "Rakhi",
      date: "August, 2025",
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
      title: "Sit and Draw Competition",
      date: "(tbd), 2025",
      description: "Drawing workshop for kids",
      image: "/images/hand-alpona.jpg",
      link: "/events/sit-and-draw-2025"
    },
    {
      title: "Diwali",
      date: "(tbd), 2025",
      description: "Diwali 2025 Celebration",
      image: "/images/candles-among-diwali-designs.jpg",
      link: "/events/diwali-2025"
    }
  ];