/* eslint-disable react/prop-types */
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

function Compress({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <div
        {...getRootProps()}
        className="border border-dashed border-blue-600 h-52 w-[50%] sm:w-[700px] bg-[#EFEEF3] flex justify-center items-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="flex border items-center space-x-2 font-bold text-lg bg-[#868FEF] text-white px-6 py-4 rounded-md">
            <DocumentIcon className="h-7 w-7 text-white" />
            <span>Choose File</span>
          </p>
        )}
      </div>
    </>
  );
}

export default Compress;
