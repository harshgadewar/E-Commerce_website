

import { Navbar } from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Heart,
  Star,
  ShoppingCart,
  Zap,
  Check,
} from "lucide-react";

export function ProductPage() {
  const [product, setProduct] = useState({});
  const [liked, setLiked] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/useraction/viewproduct/${id}`,
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post(
        `http://localhost:8080/useraction/addtocart/${product._id}`,
        {
          quantity: 1,
        },
        { withCredentials: true },
      );

      alert("Added to cart!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 mt-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>

          <span>/</span>

          <span className="text-gray-700">Product</span>
        </div>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8">
          {/* ================= IMAGE SECTION ================= */}
          <div className="relative">
            {/* Image Card */}
            <div className="bg-white   p-6 md:p-10 ">
              {/* Top badges */}
              <div className="flex justify-between items-center mb-6">
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                  ✓ In Stock
                </span>

                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition
                    ${
                      liked
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-200 text-gray-500 hover:text-red-500"
                    }`}
                >
                  <Heart size={20} fill={liked ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Product Image */}
              <div className="h-[450px] md:h-[520px] flex items-center justify-center  bg-[#f5f6f8]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full max-w-[520px] object-contain p-8 hover:scale-105 transition duration-500"
                />
              </div>

              {/* Small trust text */}
              <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-green-600" />
                  Secure Product
                </div>

                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-blue-600" />
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="bg-white   p-6 md:p-8 ">
            {/* Brand */}
            <div className="text-sm font-semibold text-blue-600 mb-3">
              VELORA
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-2xl font-semibold tracking-tight text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                4.6
                <Star size={14} fill="currentColor" />
              </div>

              <span className="text-gray-500 text-sm">128 Ratings</span>

              <span className="text-gray-300">•</span>

              <span className="text-gray-500 text-sm">54 Reviews</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-6" />

            {/* PRICE */}
            <div>
              <div className="flex items-end gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price}
                </span>

                <span className="text-lg text-gray-400 line-through mb-1">
                  ₹1,09,000
                </span>

                <span className="text-green-600 font-bold mb-1">11% OFF</span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Inclusive of all taxes
              </p>
            </div>

            {/* OFFER */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <Zap size={19} fill="currentColor" />
                </div>

                <div>
                  <p className="font-bold text-gray-900">Limited Time Deal</p>

                  <p className="text-sm text-gray-600">
                    Extra savings available at checkout
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-4 mt-7">
              <button
                onClick={addToCart}
                className="h-14 rounded-xl border-2 border-yellow-400 bg-yellow-400 hover:bg-yellow-500 font-bold text-gray-900 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <Link
                to="/payment" onClick={addToCart}
                className="h-14 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
              >
                <Zap size={20} fill="currentColor" />
                Buy Now
              </Link>
            </div>

            {/* BENEFITS */}
            <div className="mt-8 border border-gray-200 rounded-2xl overflow-hidden">
              <Benefit
                icon={<Truck size={21} />}
                title="Free Delivery"
                description="Delivered in 2 days"
                color="text-green-600"
              />

              <Benefit
                icon={<ShieldCheck size={21} />}
                title="Velora Official"
                description="100% genuine product"
                color="text-blue-600"
              />

              <Benefit
                icon={<RotateCcw size={21} />}
                title="7 Days Easy Return"
                description="Hassle-free returns"
                color="text-orange-500"
              />

              <Benefit
                icon={<CreditCard size={21} />}
                title="Secure Payment"
                description="Your payment is protected"
                color="text-purple-600"
              />
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <section className="mt-8 bg-white  overflow-hidden">
          {/* Header */}
          <div className="px-6 md:px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Everything you need to know about this product
            </p>
          </div>

          {/* Content */}
          <div className="px-6 md:px-8 py-7">
            <p className="text-gray-600 leading-8 text-[15px]">
              {product.description}
            </p>
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <TrustCard
            title="Authentic Products"
            description="Every product is carefully verified."
            icon={<Check size={22} />}
          />

          <TrustCard
            title="Fast & Reliable Delivery"
            description="Get your order delivered safely and quickly."
            icon={<Truck size={22} />}
          />

          <TrustCard
            title="Secure Shopping"
            description="Your personal and payment data stays protected."
            icon={<ShieldCheck size={22} />}
          />
        </section>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Benefit({ icon, title, description, color }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 border-gray-100">
      <div className={`${color}`}>{icon}</div>

      <div className="flex-1">
        <p className="font-semibold text-gray-900">{title}</p>

        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <Check size={18} className="text-green-500" />
    </div>
  );
}

function TrustCard({ title, description, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
      <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>

        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
