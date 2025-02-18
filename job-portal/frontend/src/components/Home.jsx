import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJob from "./LatestJob";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  });

  return (
    <div>
      <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJob />
        <Footer />
      </div>
    </div>
  );
}
