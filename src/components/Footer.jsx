import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-[#1E2E47] w-full text-white">
      <div className=" flex space-x-36 py-8  w-[90%] mx-auto">
        <div>
          <h2 className="font-bold text-lg mb-3">Converters</h2>
          <div className="flex flex-col space-y-4">
            <p>Video Converters</p>
            <p>Audio Converters</p>
            <p>Image Converters</p>
            <p>Video To mp3</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Compressors</h2>
          <div className="flex flex-col space-y-3">
            <p>Video Compressors</p>
            <p>Audio Compressors</p>
            <p>Image Compressors</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">GIF Converters</h2>
          <div className="flex flex-col space-y-3">
            <p>Video To GIF</p>
            <p>GIF To Video</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Spliting Tools</h2>
          <div className="flex flex-col space-y-3">
            <p>Video Spliting</p>
            <p>Audio Spliting</p>
          </div>
        </div>
      </div>
      <div className=" border-b-2 w-[90%] mx-auto py-3 space-x-3">
        <a href="">About Me</a>
        <a href="">Donate</a>
        <a href="">Contacts</a>
      </div>
      <div className="w-[90%] mx-auto py-5 space-x-3 flex justify-between items-center">
        <div className="flex items-center ">
          <ArrowPathRoundedSquareIcon className="w-8 h-8 text-blue-600 mr-2" />
          <span className="font-bold  text-lg">
            <Link to="/">
              <span className="text-blue-600">ET </span> Freeconvert
            </Link>
          </span>
        </div>
        <p className="text-gray-400">
          © ET-FreeConvert.com v2.22 All rights reserved (2023)
        </p>
      </div>
    </div>
  );
}

export default Footer;
