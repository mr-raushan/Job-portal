import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useGetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          toast.success("Job fetched successfully");
        }
      } catch (error) {
        console.log("Failed to use getAllJobs", error);
      }
    };
    fetchJobs();
  }, []);
}
