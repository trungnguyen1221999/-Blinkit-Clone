import { IoIosSearch } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    const isSearch = location === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    // Implement redirection logic here
    navigate("/search");
  };

  return (
    <form
      onSubmit={(e) => {
        redirectToSearchPage();
        e.preventDefault();
      }}
      className="relative w-full max-w-2xl"
    >
      <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:border-primary-200 focus-within:border-primary-200 focus-within:ring-4 focus-within:ring-primary-200/20 transition-all duration-200">
        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={isSearchPage}
          className="w-full px-4 py-3 md:py-3.5 outline-none bg-transparent relative z-10 font-inter text-slate-800 placeholder-slate-400 text-sm md:text-base"
          placeholder={isFocused || isSearchPage ? "What are you looking for?" : ""}
        />

        {/* Type animation as placeholder */}
        {value === "" && !isFocused && !isSearchPage && (
          <div className="absolute left-4 text-slate-400 pointer-events-none font-inter">
            <TypeAnimation
              sequence={[
                'Search for "milk"',
                1500,
                'Search for "sugar"', 
                1500,
                'Search for "bread"',
                1500,
                'Search for "eggs"',
                1500,
                'Search for "fruits"',
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        )}

        {/* Search Icon */}
        <button
          type="submit"
          className="absolute right-2 p-2 flex justify-center items-center cursor-pointer z-20 bg-gradient-to-r from-primary-200 to-primary-100 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <IoIosSearch className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </form>
  );
};

export default Search;
