import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateCompanies() {
  const [companyName, setCompanyName] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res);
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log("Failed to register company: " + error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-7">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-600">
            What would you like to give your company name? you can change it
            later.
          </p>
        </div>
        <div>
          <Label>Company Name</Label>
          <Input
            type="text"
            placeholder="Enter your company name"
            className="p-4 pl-3 my-2"
            required
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4 my-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
