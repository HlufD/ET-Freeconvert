import {
  FolderIcon,
  CloudIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function About() {
  return (
    <div className="flex flex-col sm:flex-row w-[50%] space-y-5 sm:w-[850px] border border-t-blue-500 mt-12 mb-7 space-x-7 p-7 shadow-lg">
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <FolderIcon className="w-10 text-blue-600" />
          <h2 className="text-lg font-bold">Convert Any File</h2>
        </div>
        <p className="text-justify text-gray-600">
          FreeConvert supports more than 1500 file conversions. You can convert
          videos, images, audio files, or e-books. There are tons of Advanced
          Options to fine-tune your conversions.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <CloudIcon className="w-10 text-sky-500" />
          <h2 className="text-lg font-bold">Works Anywhere</h2>
        </div>
        <p className="text-justify text-gray-600">
          FreeConvert is an online file converter. So it works on Windows, Mac,
          Linux, or any mobile device. All major browsers are supported. Simply
          upload a file and select a target format.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <ShieldCheckIcon className="w-10 text-red-600" />
          <h2 className="text-lg font-bold">Privacy Guaranteed</h2>
        </div>
        <p className="text-justify text-gray-600">
          We know that file security and privacy are important to you. That is
          why we use 256-bit SSL encryption when transferring files and
          automatically delete them after a few hours
        </p>
      </div>
    </div>
  );
}

export default About;
