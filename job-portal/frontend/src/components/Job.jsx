/*eslint-disable*/

import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function Job({ job }) {
  const navigate = useNavigate();
  // const jobId = "sifjsfohdsnfsduif";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="shadow-xl w-full bg-white p-5 rounded-md border border-gray-100 
    cursor-pointer transition-all duration-200 ease-in-out"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </h2>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 my-2">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/047/656/219/small/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg" />
            </Avatar>
          </Button>
          <div>
            <Link to={""} className="font-bold text-base ">
              {job?.company?.name}
            </Link>
            <p className="text-gray-600 mt-2">{job?.location}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-600 my-2">{job?.description}</p>
      </div>
      <div
        className="flex my-3  gap-3 md:flex-row lg:flex-row 
      cursor-pointer "
      >
        <Badge
          className="text-red-600 font-bold rounded-full"
          variant={"ghost"}
        >
          {job?.position}
        </Badge>
        <Badge
          className="text-blue-600 font-bold rounded-full"
          variant={"ghost"}
        >
          {job?.jobType}
        </Badge>{" "}
        <Badge
          className="text-green-600 font-bold rounded-full"
          variant={"ghost"}
        >
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center justify-between my-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button variant="outline">Save for later</Button>
      </div>
    </div>
  );
}

// 08:22:00
