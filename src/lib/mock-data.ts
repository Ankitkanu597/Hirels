export interface Professional {
  id: string;
  name: string;
  workType: string;
  charge: string;
  location: string;
  pincode: string;
  skills: string[];
  description: string;
  whatsapp: string;
  certificates: number;
  rating: number;
  imageUrl: string;
}

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: "1",
    name: "Amit Sharma",
    workType: "Plumbing",
    charge: "₹450/visit",
    location: "Kothrud, Pune",
    pincode: "411038",
    skills: ["Pipe Fitting", "Geyser Repair", "Tap Leakage"],
    description: "Expert plumber with 8+ years of experience in residential and commercial maintenance.",
    whatsapp: "919876543210",
    certificates: 2,
    rating: 4.8,
    imageUrl: "https://picsum.photos/seed/p1/400/400"
  },
  {
    id: "2",
    name: "Priya Das",
    workType: "Tutor",
    charge: "₹600/hour",
    location: "Salt Lake, Kolkata",
    pincode: "700091",
    skills: ["Mathematics", "Physics", "English"],
    description: "Certified tutor for secondary students with a proven track record of academic improvement.",
    whatsapp: "918765432109",
    certificates: 1,
    rating: 4.9,
    imageUrl: "https://picsum.photos/seed/p2/400/400"
  },
  {
    id: "3",
    name: "Rahul Verma",
    workType: "Mechanic",
    charge: "₹800/visit",
    location: "Indiranagar, Bangalore",
    pincode: "560038",
    skills: ["Two-wheeler", "Engine Tuning", "Brake Service"],
    description: "Professional automobile mechanic specialized in high-end motorcycles and engine diagnostics.",
    whatsapp: "917654321098",
    certificates: 2,
    rating: 4.7,
    imageUrl: "https://picsum.photos/seed/p3/400/400"
  },
  {
    id: "4",
    name: "Sonia Kapoor",
    workType: "Accountant",
    charge: "₹1500/month",
    location: "Gurgaon Sector 45",
    pincode: "122003",
    skills: ["GST Filing", "Bookkeeping", "Tally ERP"],
    description: "Chartered accountant with expertise in small business accounting and tax optimization.",
    whatsapp: "916543210987",
    certificates: 2,
    rating: 5.0,
    imageUrl: "https://picsum.photos/seed/p4/400/400"
  },
  {
    id: "5",
    name: "Vikram Singh",
    workType: "Cook",
    charge: "₹300/meal",
    location: "Chandigarh Sector 17",
    pincode: "160017",
    skills: ["North Indian", "Chinese", "Healthy Meal Prep"],
    description: "Passionate home chef providing hygienic and delicious meals for families and events.",
    whatsapp: "915432109876",
    certificates: 0,
    rating: 4.6,
    imageUrl: "https://picsum.photos/seed/p5/400/400"
  }
];