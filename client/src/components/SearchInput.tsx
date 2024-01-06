import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  return (
    <div className="relative flex max-w-[600px] flex-1 items-center border border-slate-300 px-4">
      <CiSearch className="text-gray-600" />
      <input
        type="text"
        placeholder="Search..."
        className="w-0 flex-1 py-[11px] pl-3 text-sm text-cs-dark outline-none"
      />
    </div>
  );
}
