import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 ">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-[90px] sm:text-[140px] font-extrabold leading-none text-[#087EA4]">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#087EA4] mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 leading-relaxed">
          Oops! The page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div> */}
      </div>
    </div>
  );
}
