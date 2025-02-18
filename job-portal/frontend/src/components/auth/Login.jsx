import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        // console.log("Recieved token ", res.data.token);
        localStorage.getItem("token", res.data.token);
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
          role: "",
        });
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("something went wrong. Please try again.");
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
            Log<span className="text-red-500">in</span>
          </h2>

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

          <div className="flex  items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  id="r1"
                  onChange={handleOnChange}
                  checked={input.role === "student"}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={handleOnChange}
                  checked={input.role === "recruiter"}
                  id="r2"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <div className="flex justify-end py-2">
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                Please wait...
              </Button>
            </div>
          ) : (
            <div className="flex justify-end py-2">
              <Button>Login</Button>
            </div>
          )}

          <p className="text-center text-sm">
            Dont have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 font-semibold text-[12px]"
            >
              signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
