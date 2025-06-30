import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import UserDropdown from "../components/header/UserDropdown";
import  SideBar from "../components/AppSideBar";

type Props = {
  children?: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block">
        <SideBar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-blue-700 text-white flex items-center justify-between px-6 py-4 shadow-md z-10">
          <div className="text-xl font-bold">MyApp</div>
          <UserDropdown />
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
