import { useParams } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function JobDescription() {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplies =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplies);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      // const token = localStorage.getItem("token"); //get token from localStorage
      // console.log("Retrieved token ", token);
      // if (!token) {
      //   console.log("Token not found. please login");
      //   return;
      // }
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); //helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Failed to apply job", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          // console.log(res);
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // ensure the state is in sync with fetch data
          toast.success("job applied successfully");
        }
      } catch (error) {
        console.log("Failed to fetch single job", error);
      }
    };
    fetchSinglejob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className=" font-bold text-2xl">{singleJob?.title}</h1>
            <div
              className="flex my-3 gap-3 md:flex-row lg:flex-row 
      cursor-pointer "
            >
              <Badge
                className="text-red-600 font-bold rounded-full"
                variant={"ghost"}
              >
                {singleJob?.position}
              </Badge>
              <Badge
                className="text-blue-600 font-bold rounded-full"
                variant={"ghost"}
              >
                {singleJob?.jobType}
              </Badge>{" "}
              <Badge
                className="text-green-600 font-bold rounded-full"
                variant={"ghost"}
              >
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-blue-600 cursor-pointer"
            }`}
          >
            {isApplied ? "Already Apply" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 py-5 font-medium text-xl ">
          {singleJob?.description}
        </h1>
        <div className="my-5">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
