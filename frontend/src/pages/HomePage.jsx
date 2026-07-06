import { CategoryBar } from "../components/CategoryBar";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
export function HomePage() {
  return (
    <div>
      <Navbar />
      <CategoryBar />

      {/* Hero image */}

      <div className="max-w-7xl mx-auto  mt-10 rounded-4xl px-2 md:px-0">
        <img
          src="/heroImg.png"
          alt="hero"
          className="
            w-full
            h-[280px]
            object-cover
            rounded-3xl  
            "
        />
      </div>

      {/* Trending section */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Trending Products</h2>

          <button>View All →</button>
        </div>

        <div
          className="flex overflow-x-auto gap-4 mt-4"
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      {/*Discount  */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Discount</h2>

          <button>View All →</button>
        </div>

        <div
          className="flex overflow-x-auto gap-4 mt-4"
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      {/* Trending section */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All products</h2>

          <button>View All →</button>
        </div>

        <div
          className="
          grid
          grid-cols-3
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-8
          gap-1
          mt-6
          "
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
