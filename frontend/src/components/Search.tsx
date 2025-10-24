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
      className="relative border border-neutral-400 rounded-md px-2 md:px-3 py-1 w-60 md:w-96 lg:w-3xl flex items-center bg-slate-100"
    >
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={isSearchPage}
        className="w-full p-1 outline-none bg-transparent relative z-10"
      />

      {/* Type animation as placeholder */}
      {value === "" && !isFocused && !isSearchPage && (
        <div className="absolute left-3 text-neutral-400 pointer-events-none">
          <TypeAnimation
            sequence={[
              'Search "milk"',
              1000,
              'Search "sugar"',
              1000,
              'Search "bread"',
              1000,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
          />
        </div>
      )}

      {/* Search Icon */}
      <button
        type="submit"
        className="absolute right-3 flex justify-center items-center cursor-pointer z-20"
      >
        <IoIosSearch size={22} className="fill-neutral-400" />
      </button>
    </form>
  );
};

export default Search;
