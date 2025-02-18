import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CompanySetup() {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    website: "",
    location: "",
    description: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("website", input.website);
    formData.append("location", input.location);
    formData.append("description", input.description);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
        dispatch();

        setInput({
          name: "",
          website: "",
          location: "",
          description: "",
          file: null,
        });
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      description: singleCompany?.description || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-8 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your company name"
                className="mt-2 p-2"
                onChange={changeEventHandler}
                value={input.name}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Enter your company name"
                className="mt-2 p-2"
                onChange={changeEventHandler}
                value={input.description}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="Enter your company name"
                className="mt-2 p-2"
                onChange={changeEventHandler}
                value={input.website}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="Enter your company name"
                className="mt-2 p-2"
                onChange={changeEventHandler}
                value={input.location}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                name="image/*"
                placeholder="Enter your company name"
                className="mt-2 p-2"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-end py-2">
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                please wait...
              </Button>
            </div>
          ) : (
            <div className="flex justify-end py-2">
              <Button className="flex justify-end py-2 mt-8" type="submit">
                Update
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// 10:38:00
