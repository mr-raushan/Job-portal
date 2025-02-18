import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log("Failed to fetch all companies ", error);
      }
    };
    fetchAllCompany();
  }, []);
}
