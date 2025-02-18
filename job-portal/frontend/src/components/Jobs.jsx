/*eslint-disable*/
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Footer from "./Footer";
import Job from "./Job";
import Navbar from "./shared/Navbar";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function jobs() {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-5">
        <div className="flex gap-4">
          <div className="w-[20%] p-4">
            <FilterCard className="w-full" />
          </div>
          {allJobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job._id} className="w-full">
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
