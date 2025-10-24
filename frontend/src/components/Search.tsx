import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="border border-neutral-400 rounded-md px-3 py-1 w-80 md:w-96 flex justify-between">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-1 outline-0"
      />
      <button className="flex justify-center items-center cursor-pointer">
        <IoIosSearch size={22} className="ml-2 fill-neutral-400" />
      </button>
    </div>
  );
};

export default Search;
