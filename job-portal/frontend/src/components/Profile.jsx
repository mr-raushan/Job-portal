import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import Footer from "./Footer";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

// const skills = ["React", "JavaScript", "Node.js", "Redux", "Tailwind CSS"];
const isResume = true;

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  // console.log("User Data in profile component:", user);
  // console.log("User FullName:", user.fullName);
  // console.log("User Bio:", user.profile?.bio);
  // console.log("User Email:", user.email);
  // console.log("User phoneNumber:", user.phoneNumber);
  // console.log("User skills:", user.profile?.skills);
  // console.log("User resume:", user.profile?.resume);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 my-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="Company Logo"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">{user?.fullName}</h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className=" flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  variant={"outline"}
                  className="rounded-full cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                  key={index}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center my-4 gap-1.5">
          <h1 className="font-bold text-lg">Resume</h1>
          {isResume ? (
            <a
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              target="blank"
              href={user?.profile?.resume}
              download
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg">Applied Jobs</h1>
        <hr className="mt-3" />
        <AppliedJobTable />
      </div>

      <Footer />
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

//07:32:00
