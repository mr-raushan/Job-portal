import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="">
      <div className="grid-background"></div>
      <main className="min-h-screen">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center  bg-gray-800 mt-10">
        Made by ❤️ <span className="">Raushan </span>
      </div>
    </div>
  );
}
