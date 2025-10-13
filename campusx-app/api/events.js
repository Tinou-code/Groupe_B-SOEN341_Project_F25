  export const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      date: "2025-10-15",
      time: "14:00",
      location: "Hall Building 101",
      category: "Technology",
      organizer: "Tech Club",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Annual Career Fair",
      date: "2025-10-20",
      time: "10:00",
      location: "Library Building Main Floor",
      category: "Career",
      organizer: "Career Services",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Spring Music Festival",
      date: "2025-10-25",
      time: "18:00",
      location: "Hall Building 531",
      category: "Entertainment",
      organizer: "Music Society",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Entrepreneurship Workshop",
      date: "2025-10-18",
      time: "13:00",
      location: "Hall Building 823",
      category: "Workshop",
      organizer: "Entrepreneurship Club",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    },
    {
      id: 5,
      title: "International Food Festival",
      date: "2025-10-22",
      time: "12:00",
      location: "Hall Building 507",
      category: "Culture",
      organizer: "International Students Association",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
    },
    {
      id: 6,
      title: "AI & Machine Learning Seminar",
      date: "2025-10-28",
      time: "15:30",
      location: "Hall Building 507",
      category: "Technology",
      organizer: "AI Research Group",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
  ];
  
  // ---------------- HELPERS ----------------
  export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  
  export function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }