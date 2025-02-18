import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("user registered", res.data);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
      setInput({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        file: "",
      });
    } catch (error) {
      console.log("Error: ", error.message);
      toast.error(error.res.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={onFormSubmit}
          className="w-1/2 border border-gray-300 rounded-md p-4 my-10"
        >
          <h2 className="text-3xl font-bold text-center">
            Sign<span className="text-red-500">Up</span>
          </h2>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your Full Name"
              value={input.fullName}
              name="fullName"
              onChange={handleOnChange}
              className="p-2"
              required
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              placeholder="Enter your email address"
              required
              className="p-2"
              onChange={handleOnChange}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              placeholder="Enter your password"
              required
              className="p-2"
              onChange={handleOnChange}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              placeholder="Enter your phone number"
              required
              className="p-2"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex  items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={handleOnChange}
                  checked={input.role === "student"}
                  id="r1"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleOnChange}
                  id="r2"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                // value={input.file?.name}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-end py-2">
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin flex justify-end py-2" />
                please wait...
              </Button>
            </div>
          ) : (
            <div className="flex justify-end py-2">
              <Button>Submit</Button>
            </div>
          )}

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 font-semibold text-[12px]"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
