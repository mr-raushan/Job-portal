/*eslint-disable*/

import { Badge } from "./ui/badge";

export default function LatestJobCards({ item }) {
  return (
    <div className="bg-white rounded-md p-5 shadow-xl border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{item?.company?.name}</h1>
        <p className="text-blue-600 font-medium">{item.location}</p>
      </div>
      <div className="my-2">
        <p className="font-medium text-base my-2">{item.title}</p>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
      <div className="flex my-2  gap-3 md:flex-row lg:flex-row cursor-pointer ">
        <Badge
          className="text-red-600 font-bold rounded-full"
          variant={"ghost"}
        >
          {item.position} position
        </Badge>
        <Badge
          className="text-blue-600 font-bold rounded-full"
          variant={"ghost"}
        >
          {item.jobType}
        </Badge>{" "}
        <Badge
          className="text-green-600 font-bold rounded-full"
          variant={"ghost"}
        >
          {item.salary}LPA
        </Badge>
      </div>
    </div>
  );
}
