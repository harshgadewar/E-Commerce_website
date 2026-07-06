import { FiSearch} from "react-icons/fi";

      export function SearchBar(){
        return(
              <div className="flex justify-center">
        {/* Search Bar */}
        <div className="flex-1  w-full md:max-w-3xl mx-2 md:mx-10">
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={15}
            />

            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="w-full border border-gray-300 rounded-2xl py-3 pl-14 pr-4 text-1xl outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
        )
      }