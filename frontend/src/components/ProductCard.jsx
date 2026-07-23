import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  return (
    <Link to={`/productpage/${product._id}`}>
      <div className="w-[100px] md:w-[150px] border rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-20 md:h-30 object-contain"
        />

        <h3 className="mt-2 font-medium text-sm line-clamp-2">
          
          {product.title}
        </h3>

       

        <p className="font-bold text-lg">
          ₹{product.price}
        </p>

      </div>
    </Link>
  );
}