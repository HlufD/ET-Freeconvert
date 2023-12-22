import {
  MagnifyingGlassIcon,
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white h-16 w-full shadow-md flex items-center justify-between px-5 ">
      <div className="flex space-x-10">
        <div className="flex items-center">
          <ArrowPathRoundedSquareIcon className="w-8 h-8 text-blue-600 mr-2" />
          <span className="font-bold  text-lg">
            <span className="text-blue-600">ET </span> Freeconvert
          </span>
        </div>
        <ul className="flex items-center  space-x-5 text-gray-500 text-sm font-bold">
          <li className="relative group  py-3 cursor-pointer">
            <div className="flex items-center  space-x-1">
              <a href="">Converters </a>
              <ChevronDownIcon className="h-4 w-4 mt-[0.3rem] text-gray-500  group-hover:hidden" />
              <ChevronUpIcon className="hidden group-hover:inline h-4 w-4 mt-[0.3rem] text-gray-500" />
            </div>
            <div className="hidden bg-white  group-hover:flex flex-col absolute top-10 w-48  space-y-2 p-3">
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Video Converter
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Audio Converter
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Imgae Converter
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Video To Mp3
              </a>
            </div>
          </li>
          <li className="relative group  py-3 cursor-pointer">
            <div className="flex items-center  space-x-1">
              <a href="">Compressors </a>
              <ChevronDownIcon className="h-4 w-4 mt-[0.3rem] text-gray-500  group-hover:hidden" />
              <ChevronUpIcon className="hidden group-hover:inline h-4 w-4 mt-[0.3rem] text-gray-500" />
            </div>
            <div className="hidden bg-white  group-hover:flex flex-col absolute top-10 w-48 border space-y-2 p-3">
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Video Compresssor
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Audio Compresssor
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Imgae Compresssor
              </a>
            </div>
          </li>
          <li className="relative group  py-3 cursor-pointer">
            <div className="flex items-center  space-x-1">
              <a href="">GIF Converters </a>
              <ChevronDownIcon className="h-4 w-4 mt-[0.3rem] text-gray-500  group-hover:hidden" />
              <ChevronUpIcon className="hidden group-hover:inline h-4 w-4 mt-[0.3rem] text-gray-500" />
            </div>
            <div className="hidden bg-white  group-hover:flex flex-col absolute top-10 w-48 border space-y-2 p-3">
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Video To GIF
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                GIF To Video
              </a>
            </div>
          </li>
          <li className="relative group  py-3 cursor-pointer">
            <div className="flex items-center  space-x-1">
              <a href="">Video & Audio Tools </a>
              <ChevronDownIcon className="h-4 w-4 mt-[0.3rem] text-gray-500  group-hover:hidden" />
              <ChevronUpIcon className="hidden group-hover:inline h-4 w-4 mt-[0.3rem] text-gray-500" />
            </div>
            <div className="hidden bg-white  group-hover:flex flex-col absolute top-10 w-48 border space-y-2 p-3">
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Split Video
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Split Audio
              </a>
              <a className="hover:bg-[#727CF5] hover:text-white p-2" href="">
                Silence Remover
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center border border-blue-600 px-4 py-1 space-x-3 rounded-3xl">
        <input
          type="text"
          className="px-4 py-1 outline-none"
          name=""
          id=""
          placeholder="search"
        />
        <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
      </div>
    </nav>
  );
}

export default Nav;
