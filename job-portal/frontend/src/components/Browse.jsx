import Footer from "./Footer";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Browse() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto ">
        <h1 className="font-bold text-2xl my-10">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-20">
          {randomJobs.map((item, index) => {
            return <Job key={index} item={item} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
