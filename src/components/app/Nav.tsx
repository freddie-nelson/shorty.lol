import { useEffect, useRef, useState } from "react";

function NavLinks({ column = false }) {
  return (
    <ul className={`flex gap-x-12 gap-y-8 font-bold text-xl text-gray-900 ${column && "flex-col"}`}>
      <li className="hover:text-blue-500 transition-colors duration-300">
        <a href="/login">login</a>
      </li>
      <li className="hover:text-blue-500 transition-colors duration-300">
        <a href="/register">register</a>
      </li>
    </ul>
  );
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const observer = new ResizeObserver(() => {
    if (!navRef.current) return;

    if (navRef.current.clientWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });
  useEffect(() => {
    if (navRef.current) {
      observer.observe(navRef.current);
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <nav ref={navRef} className="flex justify-between items-center gap-16">
      <a
        className="font-bold text-2xl text-gray-900 hover:text-blue-500 transition-colors duration-300"
        href="/"
      >
        shorty.lol
      </a>
      {isMobile ? (
        <button
          className="font-bold text-xl text-gray-900 hover:text-blue-500 transition-colors duration-300"
          onClick={() => setIsMobileOpen(true)}
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
            onClick={() => setIsMobileOpen(false)}
          >
            close menu
          </button>

          <NavLinks column />
        </div>
      )}
    </nav>
  );
}
