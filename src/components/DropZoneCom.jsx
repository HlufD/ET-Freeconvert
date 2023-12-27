/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import { DocumentIcon } from "@heroicons/react/24/outline";
import SingleFileItem from "./SingleFileItem";

function DropZoneCom({
  items,
  setFunc,
  startConversion,
  handleOutputFormatChange,
  outputFormats,
  onDrop,
  onConvert,
  Formats,
  progress,
}) {
  const onRemove = (name) => {
    const filterdItems = items.filter((item) => item.name != name);
    setFunc(filterdItems);
  };

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
      <div className="mt-4">
        {items.map((item, index) => (
          <SingleFileItem
            key={index}
            item={item}
            onRemove={onRemove}
            handleOutputFormatChange={handleOutputFormatChange}
            startConversion={startConversion}
            outputFormats={outputFormats}
            Formats={Formats}
            progress={progress}
          />
        ))}
      </div>
      <div className="flex bg-[#EFEEF3] w-[700px] items-center px-3 py-3 ">
        <p className="flex-1">Added {items.length} files </p>
        <button
          onClick={onConvert}
          className="bg-[#656EE0] text-white font-bold text-md px-5 py-3 hover:scale-105"
        >
          Convert All
        </button>
      </div>
    </>
  );
}
export default DropZoneCom;
