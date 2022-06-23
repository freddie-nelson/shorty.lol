import { useGetUser } from "@/hooks/api/useGetUser";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavLinks({ mobile = false }) {
  const { isLoading, isError, data: user, error } = useGetUser();

  return (
    <ul className={`flex gap-x-12 gap-y-8 font-bold text-xl text-gray-900 ${mobile && "flex-col"}`}>
      {mobile && (
        <li className="hover:text-blue-500 transition-colors duration-300">
          <Link to="/">home</Link>
        </li>
      )}

      {!user && (
        <>
          <li className="hover:text-blue-500 transition-colors duration-300">
            <Link to="/login">login</Link>
          </li>
          <li className="hover:text-blue-500 transition-colors duration-300">
            <Link to="/register">register</Link>
          </li>
        </>
      )}
      {!!user && (
        <li className="hover:text-blue-500 transition-colors duration-300">
          <Link to="/account">account</Link>
        </li>
      )}
    </ul>
  );
}

export default function Nav() {
  const [isMobile, setIsMobile] = useState(false);

  const observer = new ResizeObserver(() => {
    if (document.body.clientWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });
  useEffect(() => {
    observer.observe(document.body);

    return () => {
      observer.unobserve(document.body);
    };
  }, []);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileMenu = (open: boolean) => {
    setIsMobileOpen(open);

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const location = useLocation();
  useEffect(() => {
    toggleMobileMenu(false);
  }, [location]);

  return (
    <nav className="flex justify-between items-center gap-16">
      <Link
        className="font-bold text-2xl text-gray-900 hover:text-blue-500 transition-colors duration-300"
        to="/"
      >
        shorty.lol
      </Link>
      {isMobile ? (
        <button
          className="font-bold text-xl text-gray-900 hover:text-blue-500 transition-colors duration-300"
          onClick={() => toggleMobileMenu(true)}
        >
          open menu
        </button>
      ) : (
        <NavLinks />
      )}
      {isMobileOpen && (
        <div className="absolute top-0 left-0 bg-gray-50 w-full h-full flex justify-center items-center text-center">
          <button
            className="absolute top-10 right-12 font-bold text-xl text-gray-900 hover:text-blue-500 transition-colors duration-300"
            onClick={() => toggleMobileMenu(false)}
          >
            close menu
          </button>

          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
}
