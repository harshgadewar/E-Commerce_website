import  axios from "axios";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

export function ProductCard({ product }) {

  return (
    <Link to={`/productpage/${product._id}`}>
      <div
        className="
          w-[145px]
          md:w-[160px]
          bg-white
          border
          border-gray-200
          rounded-lg
          overflow-hidden
          hover:shadow-md
          transition
          cursor-pointer
        "
      >
        {/* IMAGE */}
        <div className="relative bg-gray-50 h-[130px] flex items-center justify-center">
          {product.discount > 0 && (
            <span
              className="
                absolute
                top-1.5
                left-1.5
                bg-blue-500
                text-white
                text-[9px]
                font-bold
                px-1.5
                py-1
                rounded
              "
            >
              {product.discount}% OFF
            </span>
          )}

          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-3"
          />
        </div>

        {/* CONTENT */}
        <div className="p-2.5">
          {/* TIME */}
          <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1.5">
            <FiClock size={10} />
            <span>29 MINS</span>
          </div>

          {/* TITLE */}
          <h3 className="font-medium text-xs line-clamp-2 min-h-[32px]">
            {product.title}
          </h3>

          {/* UNIT */}
          <p className="text-[11px] text-gray-500 mt-1">
            {product.unit || "1 piece"}
          </p>

          {/* PRICE + ADD */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="font-bold text-sm">₹{product.price}</p>

              {product.originalPrice && (
                <p className="text-[9px] text-gray-400 line-through">
                  ₹{product.originalPrice}
                </p>
              )}
            </div>

        
          </div>
        </div>
      </div>
    </Link>
  );
}
