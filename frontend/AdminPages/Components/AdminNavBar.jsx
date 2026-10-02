import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from "/image.png";

export function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =========================
            LOGO
        ========================= */}
        <Link
          to="/adminallproduct"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="Velora"
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        {/* =========================
            DESKTOP NAV
        ========================= */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            to="/adminallproduct"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive("/adminallproduct")
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            All Products
          </Link>

          <Link
            to="/adminallorderlist"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive("/adminallorderlist")
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            All Orders
          </Link>

        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>

      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-md md:hidden">

          <div className="flex flex-col gap-2">

            <Link
              to="/adminallproduct"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive("/adminallproduct")
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Products
            </Link>

            <Link
              to="/adminallorderlist"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive("/adminallorderlist")
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Orders
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
}