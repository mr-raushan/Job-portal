import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

export default function LatestJob() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-blue-600">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 md:grid-cols-3 lg:grid-cols-3">
        {allJobs.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((item) => <LatestJobCards key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
