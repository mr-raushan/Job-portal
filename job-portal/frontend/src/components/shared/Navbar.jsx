import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("error in logout");
    }
  };

  // console.log("user profile", user?.profile?.profilePhoto);

  return (
    <div className="w-full">
      <nav className="flex h-16 max-w-7xl justify-between items-center mx-auto">
        <div>
          <Link to={"/"} className="text-2xl font-bold">
            Job<span className="text-red-500 italic">Portal</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-5 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-red-600 transition-all duration-200 ease-in-out">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-red-600 transition-all duration-200 ease-in-out">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-red-600 transition-all duration-200 ease-in-out">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-red-600 transition-all duration-200 ease-in-out">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-red-600 transition-all duration-200 ease-in-out">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4 text-[16px]">
              <Button variant="outline">
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button className="bg-[#6a38c2] hover:bg-[#4c2097]">
                <Link to={"/signup"}>Signup</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.fullName}</p>
                    <p className=" text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start mt-4 text-gray-600 text-[16px]">
                  {user && user.role === "student" && (
                    <div className="flex gap-2 items-center w-fit">
                      <User2 />
                      <Button variant="link">
                        <Link to={"/profile"}>View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2 items-center w-fit">
                    <LogOut />
                    <Button onClick={logOutHandler} variant="link">
                      Log Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>
    </div>
  );
}
