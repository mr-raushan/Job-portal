import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div>
      {" "}
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="bg-gray-100 flex items-center justify-center mx-auto mt-10 rounded-full py-2 px-6 w-fit">
          <p className="text-red-600 font-semibold text-center mx-auto">
            No. 1 job Hunt Website
          </p>
        </div>
        <div className="text-center mb-4 mt-5 text-5xl font-bold">
          Search, Apply & <br /> Get Your
          <span className="text-blue-700"> Dream Jobs</span>
        </div>
        <div className="text-center w-[55%] mt-3 text-gray-600 font-medium flex items-center justify-center mx-auto">
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu orci
          quis arcu cursus auctor. Donec id finibus neque. Nulla facilisi. Nulla
          facilisi.
        </div>
        <div className="flex relative flex-col items-center gap-4 justify-center mx-auto mt-7 border border-gray-300 px-6 py-3 w-[55%] shadow-lg rounded-full">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
          />
          <Button className="absolute right-1 top-[10%] rounded-r-full flex items-center justify-center px-8 bg-blue-600 h-[90%] w-20  hover:bg-blue-700 transition-all duration-200 ease-in-out">
            <Search className="h-full w-full " />
          </Button>
        </div>
      </div>
    </div>
  );
}
