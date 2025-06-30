import type { ReactNode } from "react";
import { Outlet, NavLink } from "react-router-dom";


type Props = {
  children?: ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return (
    <div>
      <header className="bg-blue-700 text-white flex items-center justify-between px-6 py-4 shadow-md">
        <div className="text-xl font-bold">MyApp</div>

        {/* Navbar Menu */}
        <nav className="space-x-6">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 p-10 bg-gray-50 overflow-auto ">
        {children || <Outlet />}
        
      </main>
    </div>
  );
};

export default LoginLayout;
