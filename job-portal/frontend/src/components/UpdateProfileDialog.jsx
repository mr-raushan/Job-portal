/*eslint-disable*/

import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.length ? user?.profile?.skills : [],
    file: user?.profile?.resume || "",
  });

  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
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
        dispatch(setUser(res.data.user));
        setOpen(false);
        setInput({
          fullName: "",
          email: "",
          phoneNumber: "",
          bio: "",
          skills: [],
          file: "",
        });
        setOpen(false);
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
    setOpen(false);

    console.log("file in setInput data", input.file);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          aria-describedby="update-profile-description"
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle id="update-profile-description">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="name">Name :</Label>
                <Input
                  id="name"
                  type="text"
                  value={input.fullName}
                  name="fullName"
                  onChange={onInputChange}
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="email">Email :</Label>
                <Input
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={onInputChange}
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="number">Number :</Label>
                <Input
                  id="number"
                  type="number"
                  name="phoneNumber"
                  onChange={onInputChange}
                  value={input.phoneNumber}
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="bio">Bio :</Label>
                <Input
                  id="bio"
                  value={input.bio}
                  type="text"
                  name="bio"
                  onChange={onInputChange}
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="skills">Skills :</Label>
                <Input
                  id="skills"
                  type="text"
                  value={input.skills}
                  name="skills"
                  onChange={onInputChange}
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="file">Resume :</Label>
                <Input
                  type="file"
                  id="file"
                  name="file"
                  accept="application/pdf"
                  // value={input.file}
                  onChange={fileChangeHandler}
                  className="col-span-4"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <div className="flex justify-end py-2">
                  <Button>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                    Please wait...
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end py-2">
                  <Button>Update</Button>
                </div>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

//TOMORROW:
//or application controller me error ko handle krna hai
