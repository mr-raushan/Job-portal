import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Header() {
  return (
    <div className="">
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img
            src="./logo.png"
            alt="logo"
            className="h-10 pl-10 cursor-pointer"
          />
        </Link>
        {/* <Button variant="outline" className="mr-10" >
          Login
        </Button> */}
        <div className="mr-10">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
