

export function ProductCard() {
  return (
    <div className="w-[100px] md:w-[150px] border rounded-xl p-3 shadow-sm hover:shadow-md transition">
      
      <img
        src="/macbookimg.png"
        alt="product"
        className="w-full h-20 md:h-30 object-contain"
      />

      <h3 className="mt-2 font-medium text-sm">
       MacBook M4
      </h3>

      <p className="text-yellow-500">
        ⭐⭐⭐⭐⭐
      </p>

      <p className="font-bold text-lg">
        ₹97000
      </p>

 
    </div>
  );
}